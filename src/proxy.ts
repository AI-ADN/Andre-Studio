import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales, type Locale } from "@/config/business";

function preferredLocale(request: NextRequest): Locale {
  const header = request.headers.get("accept-language") ?? "";
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, quality] = part.trim().split(";q=");
      return { lang: tag.toLowerCase().split("-")[0], q: quality ? Number(quality) : 1 };
    })
    .filter((entry) => entry.lang && !Number.isNaN(entry.q))
    .sort((a, b) => b.q - a.q);

  const match = ranked.find((entry) => (locales as readonly string[]).includes(entry.lang));
  return (match?.lang as Locale | undefined) ?? defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some((locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`));
  if (hasLocale) return;

  request.nextUrl.pathname = `/${preferredLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next|api|images|icon.png|apple-icon.png|robots.txt|sitemap.xml|.*\\..*).*)"],
};
