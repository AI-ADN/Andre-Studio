import { describe, expect, it } from "vitest";
import {
  buildBookingMessage,
  buildWhatsAppUrl,
  estimateTotal,
  validateBookingRequest,
  whatsappChannel,
  type BookingRequest,
} from "./booking";

const validRequest: BookingRequest = {
  name: "Mariana López",
  phone: "81 1234 5678",
  email: "mariana@example.com",
  serviceIds: ["microblading", "lash-lifting"],
};

describe("validateBookingRequest", () => {
  it("accepts a complete request", () => {
    expect(validateBookingRequest(validRequest)).toEqual({});
  });

  it("requires name, phone, email and at least one service", () => {
    expect(validateBookingRequest({ name: " ", phone: "", email: "", serviceIds: [] })).toEqual({
      name: "required",
      phone: "required",
      email: "required",
      services: "required",
    });
  });

  it("rejects malformed phone numbers and emails", () => {
    const errors = validateBookingRequest({ ...validRequest, phone: "12345", email: "mariana@" });
    expect(errors).toEqual({ phone: "invalid", email: "invalid" });
  });

  it("accepts Mexican numbers with country code and formatting", () => {
    expect(validateBookingRequest({ ...validRequest, phone: "+52 (81) 1234-5678" })).toEqual({});
  });

  it("ignores unknown service ids", () => {
    expect(validateBookingRequest({ ...validRequest, serviceIds: ["not-a-service"] })).toEqual({ services: "required" });
  });
});

describe("estimateTotal", () => {
  it("adds published prices", () => {
    expect(estimateTotal(["microblading", "lash-lifting"])).toBe(3650);
    expect(estimateTotal([])).toBe(0);
  });
});

describe("buildBookingMessage", () => {
  it("lists services, total and contact details in Spanish", () => {
    const message = buildBookingMessage(
      { ...validRequest, preferredDate: "2026-11-03", preferredTime: "afternoon", notes: "Primera vez" },
      "es",
    );
    expect(message).toContain("¡Hola Andy!");
    expect(message).toContain("- Microblading inicial ($3,000)");
    expect(message).toContain("- Lashlifting ($650)");
    expect(message).toContain("Total estimado: $3,650");
    expect(message).toContain("Nombre: Mariana López");
    expect(message).toContain("Fecha preferida: martes, 3 de noviembre de 2026");
    expect(message).toContain("Horario preferido: Tarde");
    expect(message).toContain("Notas: Primera vez");
    expect(message).toContain("anticipo de $400");
  });

  it("omits optional lines when empty and supports English", () => {
    const message = buildBookingMessage(validRequest, "en");
    expect(message).toContain("Hi Andy!");
    expect(message).toContain("- Lash lifting ($650)");
    expect(message).not.toContain("Preferred date");
    expect(message).not.toContain("Notes:");
  });
});

describe("WhatsApp channel", () => {
  it("builds a wa.me link to the studio number with the encoded message", async () => {
    const result = await whatsappChannel.submit(validRequest, "es");
    expect(result.status).toBe("redirect");
    expect(result.url.startsWith("https://wa.me/528123531945?text=")).toBe(true);
    const text = decodeURIComponent(result.url.split("?text=")[1]);
    expect(text).toBe(buildBookingMessage(validRequest, "es"));
  });

  it("links to the chat without text when no message is given", () => {
    expect(buildWhatsAppUrl()).toBe("https://wa.me/528123531945");
  });
});
