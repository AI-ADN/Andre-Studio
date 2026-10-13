import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Figtree, Nanum_Pen_Script } from "next/font/google";
import Script from "next/script";
import { notFound } from "next/navigation";
import { business, isLocale, locales } from "@/config/business";
import { getDictionary } from "@/content/dictionaries";
import "../globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const nanum = Nanum_Pen_Script({
  variable: "--font-nanum",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);

  return {
    metadataBase: new URL(business.siteUrl),
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: { "es-MX": "/es", en: "/en", "x-default": "/es" },
    },
    openGraph: {
      type: "website",
      siteName: business.name,
      title: dict.meta.title,
      description: dict.meta.description,
      locale: lang === "es" ? "es_MX" : "en_US",
      url: `/${lang}`,
      images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: dict.meta.ogAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
      images: ["/images/og.jpg"],
    },
    icons: { icon: "/icon.png", apple: "/apple-icon.png" },
  };
}

export const viewport: Viewport = {
  themeColor: "#fefaed",
  colorScheme: "light",
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <html
      lang={lang === "es" ? "es-MX" : "en"}
      className={`${cormorant.variable} ${figtree.variable} ${nanum.variable} overflow-x-clip antialiased`}
    >
      <body className="min-h-dvh overflow-x-clip">
        {children}
        {GA_ID ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
