import { InstagramLogo, Sparkle, WhatsappLogo } from "@phosphor-icons/react/ssr";
import { business, fullAddress } from "@/config/business";
import type { Dictionary } from "@/content/dictionaries";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { buildWhatsAppUrl } from "@/lib/booking";

async function currentYear() {
  "use cache";
  return new Date().getFullYear();
}

export async function SiteFooter({ dict }: { dict: Dictionary }) {
  const year = await currentYear();
  const links = [
    { href: "#servicios", label: dict.nav.services },
    { href: "#estudio", label: dict.nav.studio },
    { href: "#resenas", label: dict.nav.reviews },
    { href: "#reservar", label: dict.cta.book },
    { href: "#preguntas", label: dict.nav.faq },
  ];

  return (
    <footer className="relative border-t border-rose/15 bg-blush/50 pt-20 pb-28 md:pb-12">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="flex items-center gap-2 font-display text-5xl text-ink italic sm:text-6xl">
            André
            <Sparkle weight="fill" className="size-5 text-rose" aria-hidden />
          </p>
          <p className="mt-1 text-xs font-semibold tracking-[0.35em] text-ink uppercase">Studio</p>
          <p className="mt-6 max-w-xs font-hand text-2xl text-rose">{dict.footer.tagline}</p>
        </div>

        <nav aria-label={dict.a11y.mainNav}>
          <ul className="flex flex-col gap-2.5">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-ink transition-colors hover:text-rose">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-3 text-[0.95rem]">
          <address className="text-ink not-italic">{fullAddress}</address>
          <TrackedLink
            href={buildWhatsAppUrl()}
            external
            event="whatsapp_click"
            params={{ source: "footer" }}
            className="inline-flex items-center gap-2 text-ink transition-colors hover:text-rose"
          >
            <WhatsappLogo className="size-5 text-rose" aria-hidden />
            {business.whatsapp.display}
            <span className="sr-only">{dict.a11y.newTab}</span>
          </TrackedLink>
          <TrackedLink
            href={business.instagram.url}
            external
            event="instagram_click"
            params={{ source: "footer" }}
            className="inline-flex items-center gap-2 text-ink transition-colors hover:text-rose"
          >
            <InstagramLogo className="size-5 text-rose" aria-hidden />
            {business.instagram.handle}
            <span className="sr-only">{dict.a11y.newTab}</span>
          </TrackedLink>
        </div>
      </div>

      <p className="mx-auto mt-16 max-w-6xl px-5 text-sm text-slate sm:px-8">
        © {year} {business.name}. {dict.footer.rights}
      </p>
    </footer>
  );
}
