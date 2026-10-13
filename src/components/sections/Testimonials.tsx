"use client";

import { CaretLeft, CaretRight, Star } from "@phosphor-icons/react";
import { motion } from "motion/react";
import { useRef } from "react";
import { useBooking } from "@/components/providers/BookingProvider";
import { buttonStyles, SectionTitle, WashiTape } from "@/components/ui/paper";
import { testimonials } from "@/content/testimonials";

const TILTS = [-1.5, 1, -0.5, 1.5, -1, 0.5];

export function Testimonials() {
  const { locale, dict } = useBooking();
  const trackRef = useRef<HTMLUListElement>(null);

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("li");
    const distance = card ? card.offsetWidth + 28 : track.clientWidth * 0.8;
    track.scrollBy({ left: distance * direction, behavior: "smooth" });
  };

  return (
    <section id="resenas" aria-labelledby="reviews-title" className="relative overflow-hidden bg-blush/45 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <SectionTitle id="reviews-title" start={dict.reviews.title} emphasis={dict.reviews.titleEmphasis} className="max-w-xl" />

          <motion.div
            initial={{ opacity: 0, rotate: 8, y: 20 }}
            whileInView={{ opacity: 1, rotate: 3, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 14 }}
            className="relative self-start bg-paper px-7 py-5 shadow-paper md:self-auto"
          >
            <WashiTape className="-top-3 left-1/2 -translate-x-1/2 -rotate-3" />
            <p className="font-display text-6xl leading-none font-semibold text-rose">{dict.reviews.count}</p>
            <p className="mt-1 font-hand text-2xl text-ink">{dict.reviews.countLabel}</p>
          </motion.div>
        </div>
      </div>

      <ul
        ref={trackRef}
        className="scrollbar-none mt-14 flex snap-x snap-mandatory gap-7 overflow-x-auto scroll-smooth px-5 pt-6 pb-10 sm:px-8 lg:px-[max(2rem,calc((100vw-72rem)/2+2rem))]"
      >
        {testimonials.map((testimonial, index) => (
          <motion.li
            key={testimonial.author}
            initial={{ opacity: 0, y: 40, rotate: TILTS[index] * 3 }}
            whileInView={{ opacity: 1, y: 0, rotate: TILTS[index] }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ type: "spring", stiffness: 90, damping: 16, delay: (index % 3) * 0.08 }}
            className="w-[min(20rem,82vw)] shrink-0 snap-center sm:w-[22rem]"
          >
            <figure className="paper-lined edge-torn-top flex h-full flex-col px-7 pt-9 pb-7 pl-14 shadow-paper">
              <div className="flex gap-0.5 text-rose" role="img" aria-label={dict.reviews.rating}>
                {Array.from({ length: 5 }, (_, star) => (
                  <Star key={star} weight="fill" className="size-4" aria-hidden />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 font-display text-[1.35rem] leading-snug text-ink italic">
                “{testimonial.quote[locale]}”
              </blockquote>
              <figcaption className="mt-6 text-sm">
                <span className="block font-semibold text-ink">{testimonial.author}</span>
                <span className="text-slate">
                  {dict.reviews.source}
                  {testimonial.service ? `, ${testimonial.service[locale]}` : ""}
                </span>
              </figcaption>
            </figure>
          </motion.li>
        ))}
      </ul>

      <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            aria-label={dict.a11y.previous}
            className="inline-flex size-12 items-center justify-center rounded-full border border-ink/15 bg-paper text-ink transition-colors hover:border-rose hover:bg-blush"
          >
            <CaretLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            aria-label={dict.a11y.next}
            className="inline-flex size-12 items-center justify-center rounded-full border border-ink/15 bg-paper text-ink transition-colors hover:border-rose hover:bg-blush"
          >
            <CaretRight className="size-5" />
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <p className="font-hand text-2xl text-ink">{dict.reviews.invite}</p>
          <a href="#reservar" className={buttonStyles.primary}>
            {dict.cta.book}
          </a>
        </div>
      </div>
    </section>
  );
}
