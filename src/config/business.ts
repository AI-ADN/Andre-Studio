export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

export const isLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

export const business = {
  name: "André Studio",
  owner: "Andrea Carolina Chávez",
  ownerNickname: "Andy",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://andrestudiomx.com",
  whatsapp: {
    /** E.164 digits only, used for wa.me links. */
    number: "528123531945",
    display: "+52 81 2353 1945",
  },
  phone: {
    href: "tel:+528123531945",
    display: "+52 81 2353 1945",
  },
  instagram: {
    handle: "@andre.studiomx",
    url: "https://www.instagram.com/andre.studiomx/",
  },
  address: {
    street: "Blvd. Puerta del Sol 504",
    neighborhood: "Colinas de San Jerónimo",
    postalCode: "64630",
    city: "Monterrey",
    region: "N.L.",
    regionFull: "Nuevo León",
    country: "MX",
  },
  maps: {
    query: "André Studio, Blvd. Puerta del Sol 504, Colinas de San Jerónimo, 64630 Monterrey, N.L.",
  },
  deposit: {
    amount: 400,
    currency: "MXN",
  },
  /** Approved claims from the client's current site. */
  verifiedReviews: 300,
  yearsExperience: 7,
} as const;

export const fullAddress = `${business.address.street}, ${business.address.neighborhood}, ${business.address.postalCode} ${business.address.city}, ${business.address.region}`;

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.maps.query)}`;
export const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(business.maps.query)}&output=embed`;
