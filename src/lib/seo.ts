import { business, type Locale } from "@/config/business";
import { getDictionary } from "@/content/dictionaries";
import { categories, categoryIds, services } from "@/content/services";

/** BeautySalon structured data. No ratings or review counts: those must match Google exactly and are not published here. */
export function buildLocalBusinessJsonLd(locale: Locale) {
  const dict = getDictionary(locale);
  const prices = services.map((service) => service.price);

  return {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "@id": `${business.siteUrl}/#business`,
    name: business.name,
    description: dict.meta.description,
    url: `${business.siteUrl}/${locale}`,
    image: `${business.siteUrl}/images/og.jpg`,
    telephone: business.phone.display,
    priceRange: `$${Math.min(...prices)} - $${Math.max(...prices)} MXN`,
    currenciesAccepted: "MXN",
    paymentAccepted: "Cash, Bank transfer",
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      addressLocality: business.address.city,
      addressRegion: business.address.regionFull,
      postalCode: business.address.postalCode,
      addressCountry: business.address.country,
    },
    areaServed: { "@type": "City", name: "Monterrey" },
    sameAs: [business.instagram.url],
    founder: { "@type": "Person", name: business.owner },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: dict.nav.services,
      itemListElement: categoryIds.map((categoryId) => ({
        "@type": "OfferCatalog",
        name: categories[categoryId][locale],
        itemListElement: services
          .filter((service) => service.categories[0] === categoryId)
          .map((service) => ({
            "@type": "Offer",
            price: service.price,
            priceCurrency: "MXN",
            itemOffered: {
              "@type": "Service",
              name: service.name[locale],
              description: service.description[locale],
            },
          })),
      })),
    },
  };
}
