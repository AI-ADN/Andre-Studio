"use client";

import { CalendarCheck, Check, Flower, Heart, WhatsappLogo } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { useBooking } from "@/components/providers/BookingProvider";
import { Reveal } from "@/components/ui/Reveal";
import { buttonStyles, SectionTitle, WashiTape } from "@/components/ui/paper";
import { business } from "@/config/business";
import { fill } from "@/content/dictionaries";
import { categories, categoryIds, formatPrice, services } from "@/content/services";
import { track } from "@/lib/analytics";
import {
  estimateTotal,
  hasErrors,
  timePreferences,
  validateBookingRequest,
  whatsappChannel,
  type BookingErrors,
  type BookingField,
  type TimePreference,
} from "@/lib/booking";

const stepIcons = [Flower, WhatsappLogo, CalendarCheck, Heart];
const FIELD_ORDER: BookingField[] = ["name", "phone", "email", "services"];

type Status = { kind: "idle" } | { kind: "submitting" } | { kind: "sent"; url: string };

const todayIso = () => {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60_000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 10);
};

export function Booking() {
  const { locale, dict } = useBooking();
  const deposit = formatPrice(business.deposit.amount, locale);

  return (
    <section id="reservar" aria-labelledby="booking-title" className="relative py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-16 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        <div>
          <SectionTitle id="booking-title" start={dict.booking.title} emphasis={dict.booking.titleEmphasis} />

          <ol className="relative mt-12 flex flex-col gap-9 before:absolute before:top-2 before:bottom-2 before:left-[1.35rem] before:w-px before:bg-rose/25">
            {dict.booking.steps.map((step, index) => {
              const Icon = stepIcons[index];
              return (
                <motion.li
                  key={step.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ type: "spring", stiffness: 90, damping: 18, delay: index * 0.08 }}
                  className="relative flex gap-5"
                >
                  <span className="relative z-10 flex size-11 shrink-0 items-center justify-center rounded-full border border-rose/30 bg-paper text-rose shadow-paper">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <div className="pt-1.5">
                    <h3 className="font-display text-2xl leading-tight font-medium text-ink">{step.title}</h3>
                    <p className="mt-1.5 max-w-sm leading-relaxed">{fill(step.text, { deposit })}</p>
                  </div>
                </motion.li>
              );
            })}
          </ol>

          <Reveal tilt={-2} delay={0.3} className="relative mt-12 max-w-xs">
            <p className="paper-grid relative px-6 py-5 font-hand text-2xl leading-6 text-ink shadow-paper">
              <WashiTape tone="rose" className="-top-3 left-8 h-6 w-20 rotate-3" />
              {dict.booking.receiptNote}
            </p>
          </Reveal>
        </div>

        <Reveal y={36} className="relative">
          <WashiTape className="-top-3 left-10 z-10 w-28 -rotate-6" />
          <WashiTape tone="cream" className="-top-3 right-12 z-10 w-20 rotate-[8deg]" />
          <div className="rounded-lg border border-line bg-paper p-6 shadow-lift sm:p-10">
            <BookingForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function BookingForm() {
  const { locale, dict, selected, toggle, clear } = useBooking();
  const copy = dict.booking;
  const formId = useId();
  const formRef = useRef<HTMLFormElement>(null);

  const [values, setValues] = useState({ name: "", phone: "", email: "", date: "", time: "" as TimePreference | "", notes: "" });
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const request = {
    name: values.name,
    phone: values.phone,
    email: values.email,
    serviceIds: selected,
    preferredDate: values.date || undefined,
    preferredTime: values.time || undefined,
    notes: values.notes,
  };

  const update = (field: keyof typeof values) => (value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
  };

  // Errors only surface after the first submit attempt, then update live as she types.
  const errors: BookingErrors = attempted ? validateBookingRequest(request) : {};

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateBookingRequest(request);
    setAttempted(true);

    if (hasErrors(nextErrors)) {
      track("booking_validation_failed", { fields: Object.keys(nextErrors).join(",") });
      const first = FIELD_ORDER.find((field) => nextErrors[field]);
      formRef.current?.querySelector<HTMLElement>(`[data-field="${first}"]`)?.focus();
      return;
    }

    setStatus({ kind: "submitting" });
    const result = await whatsappChannel.submit(request, locale);
    track("booking_submitted", { services_count: selected.length, estimated_total: estimateTotal(selected) });
    window.open(result.url, "_blank", "noopener,noreferrer");
    setStatus({ kind: "sent", url: result.url });
  };

  const reset = () => {
    setValues({ name: "", phone: "", email: "", date: "", time: "", notes: "" });
    setAttempted(false);
    clear();
    setStatus({ kind: "idle" });
  };

  const errorText = (field: BookingField) => {
    const code = errors[field];
    return code ? copy.errors[field][code] : undefined;
  };

  const grouped = categoryIds.map((categoryId) => ({
    categoryId,
    items: services.filter((service) => service.categories[0] === categoryId),
  }));
  const total = estimateTotal(selected);

  return (
    <AnimatePresence mode="wait" initial={false}>
      {status.kind === "sent" ? (
        <motion.div
          key="sent"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ type: "spring", stiffness: 140, damping: 20 }}
          role="status"
          className="flex flex-col items-start gap-5 py-6"
        >
          <span className="flex size-14 items-center justify-center rounded-full bg-blush text-rose">
            <Check weight="bold" className="size-7" aria-hidden />
          </span>
          <h3 className="font-display text-3xl leading-tight font-medium text-ink sm:text-4xl">{copy.success.title}</h3>
          <p className="max-w-md text-lg leading-relaxed">{copy.success.text}</p>
          <div className="mt-2 flex flex-wrap gap-3">
            <a
              href={status.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("whatsapp_click", { source: "booking_success" })}
              className={buttonStyles.primary}
            >
              <WhatsappLogo weight="fill" className="size-5" aria-hidden />
              {copy.success.open}
            </a>
            <button type="button" onClick={reset} className={buttonStyles.secondary}>
              {copy.success.again}
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          ref={formRef}
          noValidate
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          aria-labelledby={`${formId}-title`}
          className="flex flex-col gap-6"
        >
          <h3 id={`${formId}-title`} className="font-display text-3xl font-medium text-ink italic">
            {copy.formTitle}
          </h3>

          {attempted && hasErrors(errors) ? (
            <p role="alert" className="rounded-xl border border-rose/40 bg-blush/60 px-4 py-3 text-sm font-medium text-rose-dark">
              {copy.errors.summary}
            </p>
          ) : null}

          <div className="grid gap-5 sm:grid-cols-2">
            <Field id={`${formId}-name`} label={copy.fields.name} error={errorText("name")} className="sm:col-span-2">
              {(props) => (
                <input
                  {...props}
                  data-field="name"
                  type="text"
                  autoComplete="name"
                  value={values.name}
                  onChange={(event) => update("name")(event.target.value)}
                />
              )}
            </Field>
            <Field id={`${formId}-phone`} label={copy.fields.phone} hint={copy.fields.phoneHint} error={errorText("phone")}>
              {(props) => (
                <input
                  {...props}
                  data-field="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={values.phone}
                  onChange={(event) => update("phone")(event.target.value)}
                />
              )}
            </Field>
            <Field id={`${formId}-email`} label={copy.fields.email} error={errorText("email")}>
              {(props) => (
                <input
                  {...props}
                  data-field="email"
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={(event) => update("email")(event.target.value)}
                />
              )}
            </Field>
          </div>

          <fieldset
            data-field="services"
            tabIndex={-1}
            aria-describedby={errors.services ? `${formId}-services-error` : undefined}
            className="rounded-xl focus:outline-none"
          >
            <legend className="text-sm font-semibold text-ink">{copy.fields.services}</legend>
            <div className="mt-3 flex flex-col gap-4">
              {grouped.map(({ categoryId, items }) => (
                <div key={categoryId}>
                  <p className="font-hand text-xl leading-none text-slate">{categories[categoryId][locale]}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {items.map((service) => {
                      const active = selected.includes(service.id);
                      return (
                        <button
                          key={service.id}
                          type="button"
                          aria-pressed={active}
                          onClick={() => toggle(service.id, "form")}
                          className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm transition-colors duration-200 ${
                            active
                              ? "border-rose bg-rose text-cream"
                              : "border-ink/15 bg-cream text-ink hover:border-rose/60 hover:bg-blush/60"
                          }`}
                        >
                          {active ? <Check weight="bold" className="size-3.5" aria-hidden /> : null}
                          {service.name[locale]}
                          <span className={active ? "text-cream/85" : "text-slate"}>{formatPrice(service.price, locale)}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
            {errors.services ? (
              <p id={`${formId}-services-error`} className="mt-3 text-sm font-medium text-rose-dark">
                {errorText("services")}
              </p>
            ) : null}
          </fieldset>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field id={`${formId}-date`} label={copy.fields.date} optional={copy.fields.optional}>
              {(props) => (
                <input
                  {...props}
                  ref={(node) => {
                    if (node) node.min = todayIso();
                  }}
                  type="date"
                  value={values.date}
                  onChange={(event) => update("date")(event.target.value)}
                />
              )}
            </Field>
            <Field id={`${formId}-time`} label={copy.fields.time} optional={copy.fields.optional}>
              {(props) => (
                <select {...props} value={values.time} onChange={(event) => update("time")(event.target.value)}>
                  <option value="">{copy.fields.timePlaceholder}</option>
                  {timePreferences.map((option) => (
                    <option key={option} value={option}>
                      {copy.fields.timeOptions[option]}
                    </option>
                  ))}
                </select>
              )}
            </Field>
            <Field id={`${formId}-notes`} label={copy.fields.notes} optional={copy.fields.optional} className="sm:col-span-2">
              {(props) => (
                <textarea
                  {...props}
                  rows={3}
                  maxLength={500}
                  placeholder={copy.fields.notesPlaceholder}
                  value={values.notes}
                  onChange={(event) => update("notes")(event.target.value)}
                />
              )}
            </Field>
          </div>

          <div className="flex flex-col gap-5 border-t border-dashed border-rose/30 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate" aria-live="polite">
              {copy.total}
              <span className="ml-2 font-display text-3xl font-semibold text-rose">{formatPrice(total, locale)}</span>
            </p>
            <button type="submit" disabled={status.kind === "submitting"} className={`${buttonStyles.primary} disabled:opacity-70`}>
              <WhatsappLogo weight="fill" className="size-5" aria-hidden />
              {status.kind === "submitting" ? copy.submitting : copy.submit}
            </button>
          </div>
          <p className="text-sm leading-relaxed text-slate">{copy.disclaimer}</p>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

const controlClasses =
  "w-full rounded-xl border bg-cream px-4 py-3 text-base text-ink placeholder:text-slate/80 transition-colors focus:border-rose focus:bg-paper focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose";

interface ControlProps {
  id: string;
  className: string;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
}

function Field({
  id,
  label,
  hint,
  error,
  optional,
  className = "",
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  optional?: string;
  className?: string;
  children: (props: ControlProps) => ReactNode;
}) {
  const describedBy = [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(" ") || undefined;

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={id} className="text-sm font-semibold text-ink">
        {label}
        {optional ? <span className="ml-1.5 font-normal text-slate">({optional})</span> : null}
      </label>
      {children({
        id,
        className: `${controlClasses} ${error ? "border-rose" : "border-ink/20"}`,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": describedBy,
      })}
      {hint ? (
        <p id={`${id}-hint`} className="text-xs text-slate">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="text-sm font-medium text-rose-dark">
          {error}
        </p>
      ) : null}
    </div>
  );
}
