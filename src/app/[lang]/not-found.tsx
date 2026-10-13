import Link from "next/link";
import { buttonStyles } from "@/components/ui/paper";
import { getDictionary } from "@/content/dictionaries";

export default function NotFound() {
  const dict = getDictionary("es");
  const en = getDictionary("en");

  return (
    <main className="flex min-h-dvh items-center justify-center px-5">
      <div className="paper-lined edge-torn-top w-full max-w-lg px-10 pt-14 pb-10 pl-16 shadow-lift">
        <h1 className="font-display text-5xl leading-tight font-medium text-ink">{dict.notFound.title}</h1>
        <p className="mt-2 font-display text-2xl text-rose italic">{en.notFound.title}</p>
        <p className="mt-6 leading-relaxed">{dict.notFound.text}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/es" className={buttonStyles.primary}>
            {dict.notFound.back}
          </Link>
          <Link href="/en" className={buttonStyles.secondary}>
            {en.notFound.back}
          </Link>
        </div>
      </div>
    </main>
  );
}
