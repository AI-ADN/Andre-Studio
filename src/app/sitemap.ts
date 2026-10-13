import type { MetadataRoute } from "next";
import { business, locales } from "@/config/business";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(locales.map((locale) => [locale, `${business.siteUrl}/${locale}`]));

  return locales.map((locale) => ({
    url: `${business.siteUrl}/${locale}`,
    changeFrequency: "monthly",
    priority: locale === "es" ? 1 : 0.8,
    alternates: { languages },
  }));
}
