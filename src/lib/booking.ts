import { business, type Locale } from "@/config/business";
import { formatPrice, getService, type Service } from "@/content/services";

export const timePreferences = ["morning", "midday", "afternoon", "any"] as const;
export type TimePreference = (typeof timePreferences)[number];

export interface BookingRequest {
  name: string;
  phone: string;
  email: string;
  serviceIds: string[];
  /** ISO date (YYYY-MM-DD) from an <input type="date">. */
  preferredDate?: string;
  preferredTime?: TimePreference;
  notes?: string;
}

export type BookingField = "name" | "phone" | "email" | "services";
export type BookingErrorCode = "required" | "invalid";
export type BookingErrors = Partial<Record<BookingField, BookingErrorCode>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
/** Mexican numbers: 10 national digits, optionally prefixed by 52 (and the legacy mobile 1). */
const PHONE_DIGITS = { min: 10, max: 13 };
const MAX_NOTES_LENGTH = 500;

export const digitsOnly = (value: string) => value.replace(/\D/g, "");

export function validateBookingRequest(request: BookingRequest): BookingErrors {
  const errors: BookingErrors = {};

  if (request.name.trim().length < 2) errors.name = "required";

  const phoneDigits = digitsOnly(request.phone);
  if (!phoneDigits) errors.phone = "required";
  else if (phoneDigits.length < PHONE_DIGITS.min || phoneDigits.length > PHONE_DIGITS.max) errors.phone = "invalid";

  const email = request.email.trim();
  if (!email) errors.email = "required";
  else if (!EMAIL_PATTERN.test(email)) errors.email = "invalid";

  const knownServices = request.serviceIds.filter((id) => getService(id));
  if (knownServices.length === 0) errors.services = "required";

  return errors;
}

export const hasErrors = (errors: BookingErrors) => Object.keys(errors).length > 0;

export function resolveServices(serviceIds: string[]): Service[] {
  return serviceIds.map(getService).filter((service): service is Service => Boolean(service));
}

export const estimateTotal = (serviceIds: string[]) =>
  resolveServices(serviceIds).reduce((sum, service) => sum + service.price, 0);

function formatPreferredDate(isoDate: string, locale: Locale): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  if (!year || !month || !day) return isoDate;
  return new Intl.DateTimeFormat(locale === "es" ? "es-MX" : "en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

const messageCopy: Record<
  Locale,
  {
    greeting: string;
    services: string;
    total: string;
    name: string;
    phone: string;
    email: string;
    date: string;
    time: string;
    notes: string;
    closing: string;
    times: Record<TimePreference, string>;
  }
> = {
  es: {
    greeting: `¡Hola ${business.ownerNickname}! Me gustaría agendar una cita en ${business.name}.`,
    services: "Servicios:",
    total: "Total estimado:",
    name: "Nombre:",
    phone: "Teléfono:",
    email: "Correo:",
    date: "Fecha preferida:",
    time: "Horario preferido:",
    notes: "Notas:",
    closing: `¿Me confirmas disponibilidad y los datos para el anticipo de ${formatPrice(business.deposit.amount, "es")}? ¡Gracias!`,
    times: { morning: "Mañana", midday: "Mediodía", afternoon: "Tarde", any: "Sin preferencia" },
  },
  en: {
    greeting: `Hi ${business.ownerNickname}! I'd like to book an appointment at ${business.name}.`,
    services: "Services:",
    total: "Estimated total:",
    name: "Name:",
    phone: "Phone:",
    email: "Email:",
    date: "Preferred date:",
    time: "Preferred time:",
    notes: "Notes:",
    closing: `Could you confirm availability and the details for the ${formatPrice(business.deposit.amount, "en")} deposit? Thank you!`,
    times: { morning: "Morning", midday: "Midday", afternoon: "Afternoon", any: "No preference" },
  },
};

export function buildBookingMessage(request: BookingRequest, locale: Locale): string {
  const copy = messageCopy[locale];
  const selected = resolveServices(request.serviceIds);
  const total = selected.reduce((sum, service) => sum + service.price, 0);

  const lines = [
    copy.greeting,
    "",
    copy.services,
    ...selected.map((service) => `- ${service.name[locale]} (${formatPrice(service.price, locale)})`),
    `${copy.total} ${formatPrice(total, locale)}`,
    "",
    `${copy.name} ${request.name.trim()}`,
    `${copy.phone} ${request.phone.trim()}`,
    `${copy.email} ${request.email.trim()}`,
  ];

  if (request.preferredDate) lines.push(`${copy.date} ${formatPreferredDate(request.preferredDate, locale)}`);
  if (request.preferredTime) lines.push(`${copy.time} ${copy.times[request.preferredTime]}`);

  const notes = request.notes?.trim().slice(0, MAX_NOTES_LENGTH);
  if (notes) lines.push(`${copy.notes} ${notes}`);

  lines.push("", copy.closing);
  return lines.join("\n");
}

export const buildWhatsAppUrl = (message?: string) =>
  `https://wa.me/${business.whatsapp.number}${message ? `?text=${encodeURIComponent(message)}` : ""}`;

export type BookingSubmission = { status: "redirect"; url: string };

/** Phase 2 swaps this for a Calendar-backed channel that returns a confirmed slot. */
export interface BookingChannel {
  submit(request: BookingRequest, locale: Locale): Promise<BookingSubmission>;
}

export const whatsappChannel: BookingChannel = {
  async submit(request, locale) {
    return { status: "redirect", url: buildWhatsAppUrl(buildBookingMessage(request, locale)) };
  },
};
