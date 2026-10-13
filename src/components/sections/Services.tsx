"use client";

import { Check, Plus, Star } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { useBooking } from "@/components/providers/BookingProvider";
import { SectionTitle, WashiTape } from "@/components/ui/paper";
import { fill } from "@/content/dictionaries";
import {
  categories,
  categoryIds,
  formatPrice,
  services,
  shadingAddOnPrice,
  type CategoryId,
  type Service,
} from "@/content/services";
import { track } from "@/lib/analytics";

type Filter = CategoryId | "all";

export function Services() {
  const { locale, dict } = useBooking();
  const [filter, setFilter] = useState<Filter>("all");

  const visible = filter === "all" ? services : services.filter((service) => service.categories.includes(filter));
  const showShadingNote = filter === "all" || filter === "micropigmentation";

  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: dict.services.all },
    ...categoryIds.map((id) => ({ id, label: categories[id][locale] })),
  ];

  const selectFilter = (id: Filter) => {
    setFilter(id);
    track("category_selected", { category: id });
  };

  return (
    <section id="servicios" aria-labelledby="services-title" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <SectionTitle id="services-title" start={dict.services.title} emphasis={dict.services.titleEmphasis} />
          <p className="mt-5 max-w-[60ch] text-lg leading-relaxed">{dict.services.intro}</p>
        </div>

        <div className="mt-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div
            role="group"
            aria-label={dict.services.filterLabel}
            className="scrollbar-none -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
          >
            {filters.map((item) => {
              const active = filter === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => selectFilter(item.id)}
                  className={`relative shrink-0 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors duration-300 ${
                    active ? "border-rose text-cream" : "border-ink/15 bg-paper/70 text-ink hover:border-rose/50"
                  }`}
                >
                  {active ? (
                    <motion.span
                      layoutId="service-filter"
                      className="absolute inset-0 -z-0 rounded-full bg-rose"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  ) : null}
                  <span className="relative">{item.label}</span>
                </button>
              );
            })}
          </div>

          <AnimatePresence initial={false}>
            {showShadingNote ? (
              <motion.p
                key="shading"
                initial={{ opacity: 0, y: 10, rotate: 4 }}
                animate={{ opacity: 1, y: 0, rotate: 1.5 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ type: "spring", stiffness: 160, damping: 18 }}
                className="paper-grid relative max-w-xs self-start px-5 py-3 font-hand text-2xl leading-6 text-ink shadow-paper lg:self-auto"
              >
                <WashiTape tone="rose" className="-top-3 left-6 h-6 w-16 -rotate-6" />
                {fill(dict.services.shadingNote, { price: formatPrice(shadingAddOnPrice, locale) })}
              </motion.p>
            ) : null}
          </AnimatePresence>
        </div>

        <p aria-live="polite" className="sr-only">
          {fill(dict.services.results, { count: visible.length })}
        </p>

        <motion.ul layout className="mt-14 grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((service) => (
              <motion.li
                key={service.id}
                layout
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.18 } }}
                transition={{ type: "spring", stiffness: 140, damping: 20 }}
              >
                <ServiceCard service={service} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: Service }) {
  const { locale, dict, isSelected, toggle } = useBooking();
  const selected = isSelected(service.id);
  const name = service.name[locale];

  return (
    <article
      className={`group relative flex h-full flex-col rounded-md border bg-paper p-4 pt-6 shadow-paper transition-[transform,box-shadow,border-color] duration-500 ease-(--ease-soft) hover:-translate-y-1 hover:-rotate-[0.4deg] hover:shadow-lift ${
        selected ? "border-rose/60" : "border-line"
      }`}
    >
      <span aria-hidden className="absolute top-0 left-1/2 h-1.5 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#cbbdb6]" />

      {service.featured ? (
        <span className="absolute -top-px right-5 z-10 flex h-12 w-9 justify-center bg-rose pt-2.5 text-cream [clip-path:polygon(0_0,100%_0,100%_100%,50%_80%,0_100%)]">
          <Star weight="fill" className="size-4" aria-hidden />
          <span className="sr-only">{dict.services.featured}</span>
        </span>
      ) : null}

      <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-blush/50">
        <Image
          src={service.image.src}
          alt={service.image.alt[locale]}
          fill
          sizes="(min-width: 1024px) 340px, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition-transform duration-700 ease-(--ease-soft) group-hover:scale-[1.04]"
        />
      </div>
      {service.image.kind === "real" ? (
        <p className="mt-2 font-hand text-lg leading-none text-slate">{dict.services.realWork}</p>
      ) : null}

      <div className="mt-4 flex items-start justify-between gap-4 px-1">
        <h3 className="font-display text-[1.65rem] leading-[1.1] font-medium text-ink">{name}</h3>
        <p className="shrink-0 font-display text-[1.75rem] leading-none font-semibold text-rose">
          {formatPrice(service.price, locale)}
        </p>
      </div>

      <p className="mt-3 px-1 text-[0.94rem] leading-relaxed">{service.description[locale]}</p>

      {service.includes ? (
        <div className="mt-4 px-1">
          <p className="text-xs font-semibold text-ink">{dict.services.includes}</p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {service.includes[locale].map((item) => (
              <li key={item} className="rounded-full bg-blush/70 px-2.5 py-1 text-xs text-ink">
                {item}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="mt-auto px-1 pt-6">
        <motion.button
          type="button"
          aria-pressed={selected}
          aria-label={fill(selected ? dict.services.removeAria : dict.services.addAria, { service: name })}
          onClick={() => toggle(service.id, "catalog")}
          whileTap={{ scale: 0.96 }}
          className={`inline-flex w-full items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition-colors duration-300 ${
            selected
              ? "border-rose bg-rose text-cream hover:bg-rose-dark"
              : "border-ink/15 bg-cream text-ink hover:border-rose hover:bg-blush"
          }`}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={selected ? "added" : "add"}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="inline-flex items-center gap-2"
            >
              {selected ? <Check weight="bold" className="size-4" aria-hidden /> : <Plus weight="bold" className="size-4" aria-hidden />}
              {selected ? dict.services.added : dict.services.add}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </div>
    </article>
  );
}
