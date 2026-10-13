"use client";

import { List, Sparkle, X } from "@phosphor-icons/react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useBooking } from "@/components/providers/BookingProvider";
import { buttonStyles } from "@/components/ui/paper";
import { track } from "@/lib/analytics";

const SCROLLED_THRESHOLD = 24;

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 font-display text-[1.6rem] leading-none text-ink ${className}`}>
      <Sparkle weight="fill" className="size-3.5 text-rose" aria-hidden />
      <span className="italic">André</span>
      <span className="font-sans text-[0.7rem] font-semibold tracking-[0.3em] uppercase">Studio</span>
    </span>
  );
}

export function SiteHeader() {
  const { locale, dict } = useBooking();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const otherLocale = locale === "es" ? "en" : "es";

  useMotionValueEvent(scrollY, "change", (value) => {
    const next = value > SCROLLED_THRESHOLD;
    if (next !== scrolled) setScrolled(next);
  });

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const links = [
    { href: "#servicios", label: dict.nav.services },
    { href: "#estudio", label: dict.nav.studio },
    { href: "#resenas", label: dict.nav.reviews },
    { href: "#preguntas", label: dict.nav.faq },
    { href: "#contacto", label: dict.nav.contact },
  ];

  const languageSwitch = (
    <Link
      href={`/${otherLocale}`}
      hrefLang={otherLocale}
      aria-label={dict.a11y.switchLanguage}
      onClick={() => track("language_switched", { to: otherLocale })}
      className="inline-flex size-10 items-center justify-center rounded-full border border-ink/15 text-xs font-semibold tracking-wider text-ink transition-colors hover:border-rose/50 hover:bg-blush/60"
    >
      {dict.nav.languageLabel}
    </Link>
  );

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-5 sm:pt-4">
      <motion.div
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.1 }}
        className={`mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 rounded-full border px-4 transition-[background-color,border-color,box-shadow] duration-500 sm:px-6 ${
          scrolled || open
            ? "border-rose/15 bg-cream/85 shadow-paper backdrop-blur-md"
            : "border-transparent bg-cream/40 backdrop-blur-sm"
        }`}
      >
        <a href="#inicio" className="shrink-0 rounded-full" aria-label="André Studio">
          <Wordmark />
        </a>

        <nav aria-label={dict.a11y.mainNav} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={buttonStyles.ghost}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">{languageSwitch}</div>
          <a href="#reservar" className={`${buttonStyles.primary} !px-5 !py-2.5 text-sm max-md:!hidden`}>
            {dict.cta.book}
          </a>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? dict.a11y.closeMenu : dict.a11y.openMenu}
            className="inline-flex size-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-blush/70 lg:hidden"
          >
            {open ? <X className="size-5" /> : <List className="size-5" />}
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            id="mobile-menu"
            aria-label={dict.a11y.mainNav}
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="paper-lined mx-auto mt-2 max-w-6xl origin-top rounded-3xl border border-rose/15 p-6 pl-16 shadow-lift lg:hidden"
          >
            <ul className="flex flex-col gap-1">
              {links.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * index }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block py-1.5 font-display text-3xl text-ink transition-colors hover:text-rose"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="mt-6 flex items-center gap-3">
              <a href="#reservar" onClick={() => setOpen(false)} className={buttonStyles.primary}>
                {dict.cta.book}
              </a>
              {languageSwitch}
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
