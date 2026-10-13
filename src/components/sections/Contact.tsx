import { ArrowUpRight, Clock, InstagramLogo, MapPin, WhatsappLogo } from "@phosphor-icons/react/ssr";
import { business, fullAddress, mapsEmbedUrl, mapsUrl } from "@/config/business";
import type { Dictionary } from "@/content/dictionaries";
import { Reveal } from "@/components/ui/Reveal";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { buttonStyles, SectionTitle, WashiTape } from "@/components/ui/paper";
import { buildWhatsAppUrl } from "@/lib/booking";

export function Contact({ dict }: { dict: Dictionary }) {
  return (
    <section id="contacto" aria-labelledby="contact-title" className="relative pt-12 pb-24 sm:pb-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="relative">
          <div className="relative h-[22rem] overflow-hidden rounded-t-[12rem] border border-line shadow-lift sm:h-[30rem] lg:h-[34rem] lg:rounded-t-[18rem]">
            <iframe
              title={dict.contact.mapTitle}
              src={mapsEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 size-full border-0 saturate-[0.65] sepia-[0.15]"
            />
          </div>

          <Reveal
            tilt={-1}
            className="relative z-10 mx-auto -mt-20 w-[calc(100%-1.5rem)] max-w-md sm:-mt-28 lg:absolute lg:bottom-10 lg:left-10 lg:mt-0 lg:w-auto"
          >
            <div className="paper-lined relative rounded-sm border border-line p-7 pl-16 shadow-lift sm:p-9 sm:pl-20">
              <WashiTape className="-top-3 left-1/2 -translate-x-1/2 rotate-2" />
              <SectionTitle id="contact-title" start={dict.contact.title} emphasis={dict.contact.titleEmphasis} className="!text-4xl sm:!text-5xl" />

              <dl className="mt-6 flex flex-col gap-4 text-[0.95rem]">
                <div className="flex gap-3">
                  <dt>
                    <MapPin className="mt-0.5 size-5 text-rose" aria-hidden />
                    <span className="sr-only">{dict.contact.address}</span>
                  </dt>
                  <dd className="text-ink">
                    <address className="not-italic">{fullAddress}</address>
                  </dd>
                </div>
                <div className="flex gap-3">
                  <dt>
                    <WhatsappLogo className="mt-0.5 size-5 text-rose" aria-hidden />
                    <span className="sr-only">{dict.contact.phone}</span>
                  </dt>
                  <dd>
                    <TrackedLink
                      href={business.phone.href}
                      event="phone_click"
                      params={{ source: "contact" }}
                      className="text-ink underline decoration-rose/40 underline-offset-4 hover:decoration-rose"
                    >
                      {business.phone.display}
                    </TrackedLink>
                  </dd>
                </div>
                <div className="flex gap-3">
                  <dt>
                    <Clock className="mt-0.5 size-5 text-rose" aria-hidden />
                  </dt>
                  <dd>{dict.contact.schedule}</dd>
                </div>
              </dl>

              <div className="mt-7 flex flex-wrap gap-2.5">
                <TrackedLink
                  href={buildWhatsAppUrl()}
                  external
                  event="whatsapp_click"
                  params={{ source: "contact" }}
                  className={`${buttonStyles.primary} !px-5 !py-3 text-sm`}
                >
                  <WhatsappLogo weight="fill" className="size-4" aria-hidden />
                  {dict.cta.whatsapp}
                  <span className="sr-only">{dict.a11y.newTab}</span>
                </TrackedLink>
                <TrackedLink
                  href={mapsUrl}
                  external
                  event="map_click"
                  className={`${buttonStyles.secondary} !px-5 !py-3 text-sm`}
                >
                  {dict.contact.directions}
                  <ArrowUpRight className="size-4" aria-hidden />
                  <span className="sr-only">{dict.a11y.newTab}</span>
                </TrackedLink>
                <TrackedLink
                  href={business.instagram.url}
                  external
                  event="instagram_click"
                  params={{ source: "contact" }}
                  className={`${buttonStyles.secondary} !px-5 !py-3 text-sm`}
                >
                  <InstagramLogo className="size-4" aria-hidden />
                  {business.instagram.handle}
                  <span className="sr-only">{dict.a11y.newTab}</span>
                </TrackedLink>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
