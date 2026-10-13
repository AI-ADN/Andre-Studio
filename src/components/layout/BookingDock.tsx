"use client";

import { ArrowRight, WhatsappLogo, X } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useBooking } from "@/components/providers/BookingProvider";
import { buttonStyles } from "@/components/ui/paper";
import { fill } from "@/content/dictionaries";
import { formatPrice } from "@/content/services";
import { track } from "@/lib/analytics";
import { buildWhatsAppUrl, estimateTotal } from "@/lib/booking";

/** Hidden while the hero or the booking form is on screen, where the same actions are already visible. */
function useSectionsInView(ids: string[]) {
  const [visible, setVisible] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setVisible((current) => {
          const next = { ...current };
          for (const entry of entries) next[entry.target.id] = entry.isIntersecting;
          return next;
        });
      },
      { threshold: 0.15 },
    );
    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [ids]);

  return visible;
}

const WATCHED = ["inicio", "reservar"];
const spring = { type: "spring", stiffness: 260, damping: 26 } as const;

export function BookingDock() {
  const { locale, dict, selected, clear } = useBooking();
  const inView = useSectionsInView(WATCHED);
  const covered = inView.inicio || inView.reservar;
  const count = selected.length;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-45 flex justify-center px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <AnimatePresence mode="wait">
        {count > 0 && !inView.reservar ? (
          <motion.div
            key="selection"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={spring}
            className="pointer-events-auto flex w-full max-w-xl items-center gap-3 rounded-full border border-rose/25 bg-paper/95 py-2 pr-2 pl-5 shadow-lift backdrop-blur-md"
          >
            <div className="min-w-0 flex-1" aria-live="polite">
              <p className="truncate text-sm font-semibold text-ink">
                {fill(count === 1 ? dict.dock.selected : dict.dock.selectedPlural, { count })}
              </p>
              <p className="text-xs text-slate">
                {dict.dock.total}{" "}
                <motion.span key={count} initial={{ opacity: 0.4 }} animate={{ opacity: 1 }} className="font-semibold text-rose">
                  {formatPrice(estimateTotal(selected), locale)}
                </motion.span>
              </p>
            </div>
            <button
              type="button"
              onClick={clear}
              aria-label={dict.dock.clear}
              className="inline-flex size-10 shrink-0 items-center justify-center rounded-full text-slate transition-colors hover:bg-blush hover:text-ink"
            >
              <X className="size-4" />
            </button>
            <a href="#reservar" className={`${buttonStyles.primary} !px-5 !py-3 text-sm`}>
              {dict.dock.continue}
              <ArrowRight className="size-4" aria-hidden />
            </a>
          </motion.div>
        ) : count === 0 && !covered ? (
          <motion.div
            key="mobile-cta"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={spring}
            className="pointer-events-auto flex w-full max-w-md items-center gap-2 rounded-full border border-rose/20 bg-paper/95 p-2 shadow-lift backdrop-blur-md md:hidden"
          >
            <a href="#reservar" className={`${buttonStyles.primary} flex-1 !py-3`}>
              {dict.cta.book}
            </a>
            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("whatsapp_click", { source: "mobile_dock" })}
              aria-label={`${dict.cta.whatsapp} ${dict.a11y.newTab}`}
              className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-rose text-cream"
            >
              <WhatsappLogo weight="fill" className="size-6" />
            </a>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
