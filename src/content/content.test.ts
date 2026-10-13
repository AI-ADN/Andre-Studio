import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { en } from "./dictionaries/en";
import { es } from "./dictionaries/es";
import { categoryIds, services } from "./services";

/** Prices published in references/service_1..5.png. */
const publishedPrices: Record<string, number> = {
  microblading: 3000,
  microshading: 3350,
  "second-session": 1800,
  "touch-up": 2200,
  "soft-shape": 250,
  "glossy-lift": 350,
  "velvet-brows": 450,
  "lash-lifting": 650,
  "glow-experience": 1650,
  "deep-cleansing": 800,
  "facial-yoga": 700,
  "sideburn-wax": 200,
  "lip-wax": 150,
  "brow-removal": 1500,
  "tattoo-removal": 2000,
};

describe("service catalog", () => {
  it("contains every published service with its published price", () => {
    expect(Object.fromEntries(services.map((service) => [service.id, service.price]))).toEqual(publishedPrices);
  });

  it("has unique ids and covers every category", () => {
    expect(new Set(services.map((service) => service.id)).size).toBe(services.length);
    for (const category of categoryIds) {
      expect(services.some((service) => service.categories.includes(category))).toBe(true);
    }
  });

  it("references images that exist", () => {
    for (const service of services) {
      expect(existsSync(join(process.cwd(), "public", service.image.src)), service.image.src).toBe(true);
    }
  });

  it("is fully translated", () => {
    for (const service of services) {
      expect(service.name.es && service.name.en && service.description.es && service.description.en).toBeTruthy();
      if (service.includes) expect(service.includes.en).toHaveLength(service.includes.es.length);
    }
  });
});

describe("dictionaries", () => {
  const collectStrings = (value: unknown): string[] =>
    typeof value === "string"
      ? [value]
      : Array.isArray(value)
        ? value.flatMap(collectStrings)
        : value && typeof value === "object"
          ? Object.values(value).flatMap(collectStrings)
          : [];

  it("keep the same list lengths in both languages", () => {
    expect(en.studio.reasons).toHaveLength(es.studio.reasons.length);
    expect(en.booking.steps).toHaveLength(es.booking.steps.length);
    expect(en.faq.items).toHaveLength(es.faq.items.length);
  });

  it("never use em or en dashes in visible copy", () => {
    for (const text of [...collectStrings(es), ...collectStrings(en)]) {
      expect(text, text).not.toMatch(/[—–]/);
    }
  });
});
