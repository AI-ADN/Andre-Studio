import type { ReactNode } from "react";

/** Semi-transparent strip of washi tape. Position it with className. */
export function WashiTape({ className = "", tone = "blush" }: { className?: string; tone?: "blush" | "rose" | "cream" }) {
  const tones = {
    blush: "bg-blush-deep/70",
    rose: "bg-rose/25",
    cream: "bg-[#f3ead6]/80",
  } as const;
  return <span aria-hidden className={`washi pointer-events-none absolute block h-7 w-24 ${tones[tone]} ${className}`} />;
}

/** Spiral binding for notebook-style panels. */
export function SpiralBinding({ rings = 14, className = "" }: { rings?: number; className?: string }) {
  return (
    <span aria-hidden className={`pointer-events-none absolute flex flex-col justify-around ${className}`}>
      {Array.from({ length: rings }, (_, index) => (
        <span key={index} className="block h-2.5 w-9 rounded-full border-[3px] border-ink/85 bg-transparent" />
      ))}
    </span>
  );
}

export function SectionTitle({
  start,
  emphasis,
  id,
  className = "",
  as: Tag = "h2",
}: {
  start: ReactNode;
  emphasis: ReactNode;
  id?: string;
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <Tag
      id={id}
      className={`font-display text-4xl leading-[1.1] font-medium tracking-tight text-ink text-balance-safe sm:text-5xl lg:text-6xl ${className}`}
    >
      {start} <em className="pb-1 font-normal text-rose italic">{emphasis}</em>
    </Tag>
  );
}

export const buttonStyles = {
  primary:
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-rose/40 bg-blush px-6 py-3.5 text-[0.95rem] font-semibold text-ink shadow-paper transition-[background-color,color,transform,box-shadow] duration-300 ease-(--ease-soft) hover:-translate-y-0.5 hover:bg-rose hover:text-cream hover:shadow-lift active:translate-y-0 active:scale-[0.98]",
  secondary:
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-ink/15 bg-paper/60 px-6 py-3.5 text-[0.95rem] font-medium text-ink transition-[background-color,border-color,transform] duration-300 ease-(--ease-soft) hover:border-rose/50 hover:bg-paper active:scale-[0.98]",
  ghost:
    "inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-ink transition-colors hover:bg-blush/70",
} as const;
