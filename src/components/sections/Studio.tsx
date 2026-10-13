import {
  Armchair,
  CalendarCheck,
  Drop,
  HandHeart,
  Heart,
  Medal,
  Paperclip,
  PenNib,
  SealCheck,
  UserFocus,
} from "@phosphor-icons/react/ssr";
import Image from "next/image";
import type { Dictionary } from "@/content/dictionaries";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle, SpiralBinding, WashiTape } from "@/components/ui/paper";

const reasonIcons = [UserFocus, PenNib, Medal, Drop, Armchair, HandHeart, Heart, CalendarCheck];

export function Studio({ dict }: { dict: Dictionary }) {
  const { studio } = dict;

  return (
    <section id="estudio" aria-labelledby="studio-title" className="relative py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10">
        <Reveal tilt={-0.6} className="relative lg:col-span-7">
          <div className="paper-lined relative rounded-r-lg border border-line py-10 pr-6 pl-16 shadow-lift sm:py-14 sm:pr-10 sm:pl-24">
            <SpiralBinding className="inset-y-6 -left-4" rings={16} />
            <SectionTitle id="studio-title" start={studio.title} emphasis={studio.titleEmphasis} />
            <p className="mt-4 max-w-md font-hand text-[1.75rem] leading-8 text-rose">{studio.intro}</p>

            <ul className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {studio.reasons.map((reason, index) => {
                const Icon = reasonIcons[index];
                return (
                  <li key={reason.title} className="flex gap-3.5">
                    <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-blush text-rose">
                      <Icon className="size-[1.15rem]" aria-hidden />
                    </span>
                    <div>
                      <h3 className="font-semibold text-ink">{reason.title}</h3>
                      <p className="mt-1 text-[0.94rem] leading-relaxed">{reason.text}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>

        <div className="relative grid gap-10 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1 lg:gap-12 lg:pt-10">
          <Reveal tilt={2.5} delay={0.1} className="relative mx-auto w-full max-w-sm">
            <figure className="bg-paper p-3 pb-4 shadow-lift">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="/images/real/studio.webp"
                  alt={studio.studioAlt}
                  fill
                  sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 90vw"
                  className="object-cover object-[50%_60%]"
                />
              </div>
              <figcaption className="mt-3 text-center font-hand text-3xl text-ink">{studio.studioCaption}</figcaption>
            </figure>
            <Paperclip aria-hidden weight="bold" className="absolute -top-5 left-8 size-12 -rotate-12 text-slate" />
          </Reveal>

          <Reveal tilt={-1.5} delay={0.2} className="relative mx-auto w-full max-w-sm">
            <div className="paper-grid relative p-7 shadow-paper">
              <WashiTape className="-top-3 -right-5 w-24 rotate-[30deg]" />
              <div className="flex items-start gap-4">
                <div className="relative size-20 shrink-0 overflow-hidden rounded-full border-4 border-paper shadow-paper">
                  <Image src="/images/gen/pigments.webp" alt={studio.pigmentsAlt} fill sizes="80px" className="object-cover" />
                </div>
                <h3 className="pt-2 font-display text-3xl leading-tight font-medium text-ink italic">{studio.pigmentsTitle}</h3>
              </div>
              <p className="mt-4 leading-relaxed text-ink/85">{studio.pigmentsText}</p>
              <ul className="mt-5 flex flex-col gap-2">
                {studio.badges.map((badge) => (
                  <li key={badge} className="flex items-center gap-2 text-sm font-medium text-ink">
                    <SealCheck weight="fill" className="size-5 shrink-0 text-rose" aria-hidden />
                    {badge}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
