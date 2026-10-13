"use client";

import { ArrowDown, Heart, Sparkle } from "@phosphor-icons/react";
import { motion, useScroll, useTransform, type Variants } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { useBooking } from "@/components/providers/BookingProvider";
import { buttonStyles, WashiTape } from "@/components/ui/paper";

const copyVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.2 } },
};

const lineVariants: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 18 } },
};

export function Hero() {
  const { dict } = useBooking();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });

  const archY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, 1.07]);
  const stickyY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section
      ref={sectionRef}
      id="inicio"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100dvh] items-center overflow-hidden pt-28 pb-16 lg:pt-24"
    >
      <div
        aria-hidden
        className="absolute -top-40 -right-40 -z-10 size-[38rem] rounded-full bg-blush/70 blur-3xl"
      />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10">
        <motion.div variants={copyVariants} initial="hidden" animate="show" className="max-w-xl">
          <motion.p
            variants={lineVariants}
            className="mb-6 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-rose uppercase"
          >
            <Sparkle weight="fill" className="size-3" aria-hidden />
            {dict.hero.eyebrow}
          </motion.p>

          <h1
            id="hero-title"
            className="font-display text-[clamp(3rem,7vw,5.4rem)] leading-[1.02] font-medium tracking-tight text-ink"
          >
            <motion.span variants={lineVariants} className="block">
              {dict.hero.titleStart}
            </motion.span>
            <motion.span variants={lineVariants} className="block pb-2 font-normal text-rose italic">
              {dict.hero.titleEmphasis}
            </motion.span>
          </h1>

          <motion.p variants={lineVariants} className="mt-6 max-w-md text-lg leading-relaxed text-slate">
            {dict.hero.subtitle}
          </motion.p>

          <motion.div variants={lineVariants} className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#reservar" className={buttonStyles.primary}>
              {dict.cta.book}
            </a>
            <a href="#servicios" className={buttonStyles.secondary}>
              {dict.hero.secondary}
              <ArrowDown className="size-4" aria-hidden />
            </a>
          </motion.div>
        </motion.div>

        <div className="relative mx-auto w-full max-w-[19rem] sm:max-w-[24rem] lg:mr-0 lg:max-w-[27rem]">
          <motion.div style={{ y: archY }} className="relative aspect-[4/5]">
            <motion.span
              aria-hidden
              initial={{ opacity: 0, x: 0, y: 0 }}
              animate={{ opacity: 1, x: 18, y: -18 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
              className="absolute inset-0 rounded-t-full border border-rose/40"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 overflow-hidden rounded-t-full bg-[radial-gradient(120%_80%_at_50%_10%,#f7ebf1_0%,#f0dfe9_45%,#e5c8d8_100%)] shadow-lift"
            >
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 60, damping: 18, delay: 0.25 }}
                style={{ scale: portraitScale }}
                className="absolute top-[-3%] left-[47.8%] aspect-[3/4] w-[112%] -translate-x-1/2 origin-top"
              >
                <Image
                  src="/images/owner-portrait.webp"
                  alt={dict.hero.ownerAlt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 490px, (min-width: 640px) 430px, 340px"
                  className="object-contain object-top"
                />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24, rotate: -5 }}
              animate={{ opacity: 1, y: 0, rotate: -2 }}
              transition={{ type: "spring", stiffness: 90, damping: 15, delay: 0.85 }}
              className="absolute -inset-x-5 -bottom-[3%] h-[20%] sm:-inset-x-8"
            >
              <div className="paper-lined edge-torn-top flex size-full items-center justify-center pt-2 shadow-paper">
                <p className="font-hand text-[1.9rem] leading-none text-ink sm:text-4xl">
                  {dict.hero.hello}{" "}
                  <Heart weight="fill" className="inline size-6 -translate-y-1 text-rose" aria-hidden />
                </p>
              </div>
              <WashiTape className="-top-3 left-2 -rotate-[24deg]" />
            </motion.div>

            <Sparkle weight="fill" aria-hidden className="absolute -top-2 -left-6 size-7 text-rose/70" />
            <Sparkle weight="fill" aria-hidden className="absolute top-14 -left-12 size-4 text-rose/50" />
            <Sparkle weight="fill" aria-hidden className="absolute -right-8 bottom-1/3 size-5 text-rose/60" />
          </motion.div>

          <motion.div style={{ y: stickyY }} className="absolute top-10 -right-3 sm:-right-10">
            <motion.div
              initial={{ opacity: 0, rotate: 14, y: -20 }}
              animate={{ opacity: 1, rotate: 5, y: 0 }}
              transition={{ type: "spring", stiffness: 90, damping: 14, delay: 1.1 }}
              className="relative"
            >
              <div className="paper-grid w-32 p-4 shadow-paper sm:w-36">
                <p className="font-hand text-2xl leading-6 text-ink">{dict.hero.experience}</p>
              </div>
              <WashiTape tone="cream" className="-top-3 -right-4 w-16 rotate-[38deg]" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
