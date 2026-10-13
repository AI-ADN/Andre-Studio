import { notFound } from "next/navigation";
import { BookingDock } from "@/components/layout/BookingDock";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { BookingProvider } from "@/components/providers/BookingProvider";
import { Booking } from "@/components/sections/Booking";
import { Contact } from "@/components/sections/Contact";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { ServiceRibbon } from "@/components/sections/ServiceRibbon";
import { Services } from "@/components/sections/Services";
import { Studio } from "@/components/sections/Studio";
import { Testimonials } from "@/components/sections/Testimonials";
import { isLocale } from "@/config/business";
import { getDictionary } from "@/content/dictionaries";
import { buildLocalBusinessJsonLd } from "@/lib/seo";

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <BookingProvider locale={lang} dict={dict}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildLocalBusinessJsonLd(lang)).replace(/</g, "\\u003c") }}
      />
      <a
        href="#contenido"
        className="sr-only z-50 rounded-full bg-ink px-5 py-3 text-cream focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        {dict.a11y.skip}
      </a>
      <SiteHeader />
      <main id="contenido">
        <Hero />
        <div className="overflow-hidden py-6">
          <div className="-mx-8">
            <ServiceRibbon locale={lang} />
          </div>
        </div>
        <Services />
        <Studio dict={dict} />
        <Testimonials />
        <Booking />
        <Faq dict={dict} locale={lang} />
        <Contact dict={dict} />
      </main>
      <SiteFooter dict={dict} />
      <BookingDock />
    </BookingProvider>
  );
}
