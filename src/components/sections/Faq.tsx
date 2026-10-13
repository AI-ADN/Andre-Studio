import { Plus } from "@phosphor-icons/react/ssr";
import { business, type Locale } from "@/config/business";
import { fill, type Dictionary } from "@/content/dictionaries";
import { formatPrice, shadingAddOnPrice } from "@/content/services";
import { SectionTitle } from "@/components/ui/paper";

export function Faq({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const values = {
    deposit: formatPrice(business.deposit.amount, locale),
    shading: formatPrice(shadingAddOnPrice, locale),
  };

  return (
    <section id="preguntas" aria-labelledby="faq-title" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <SectionTitle id="faq-title" start={dict.faq.title} emphasis={dict.faq.titleEmphasis} className="text-center" />

        <div className="mt-14 flex flex-col gap-3">
          {dict.faq.items.map((item, index) => (
            <details
              key={item.q}
              name="faq"
              open={index === 0}
              className="faq-item group rounded-2xl border border-line bg-paper/80 shadow-paper transition-colors open:border-rose/30 open:bg-paper"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-2xl px-6 py-5 text-left font-display text-[1.4rem] leading-snug font-medium text-ink transition-colors hover:text-rose sm:px-8">
                {item.q}
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-blush text-rose transition-transform duration-500 ease-(--ease-soft) group-open:rotate-45">
                  <Plus weight="bold" className="size-4" aria-hidden />
                </span>
              </summary>
              <p className="px-6 pb-6 leading-relaxed sm:px-8">{fill(item.a, values)}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
