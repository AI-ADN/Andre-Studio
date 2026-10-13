import type { Locale } from "@/config/business";
import { en } from "./en";
import { es, type Dictionary } from "./es";

const dictionaries: Record<Locale, Dictionary> = { es, en };

export const getDictionary = (locale: Locale): Dictionary => dictionaries[locale];

export const fill = (template: string, values: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match));

export type { Dictionary };
