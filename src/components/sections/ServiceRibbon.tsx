import { Sparkle } from "@phosphor-icons/react/ssr";
import type { Locale } from "@/config/business";
import { services } from "@/content/services";

export function ServiceRibbon({ locale }: { locale: Locale }) {
  const names = services.map((service) => service.name[locale]);
  const sequence = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {names.map((name) => (
        <li key={name} className="flex items-center gap-6 pr-6 font-display text-2xl text-ink italic sm:text-3xl">
          {name}
          <Sparkle weight="fill" className="size-3.5 text-rose" aria-hidden />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="relative -rotate-1 border-y border-rose/20 bg-blush/80 py-4 shadow-paper">
      <div className="flex w-max animate-marquee motion-reduce:animate-none">
        {sequence(false)}
        {sequence(true)}
      </div>
    </div>
  );
}
