import type { Metadata } from "next";
import "./globals.css";
import getConfig from "@/config";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/common/theme-context";

export const metadata: Metadata = {
  metadataBase: new URL(getConfig().baseUrl),
  title: { default: "Function", template: "%s | Function" },
  description: "Дизайн Function. Фёдор Бельтюгов.",
  keywords: ["дизайн", "фёдор", "белтюгов", "function"],
  openGraph: {
    type: "website",
    countryName: "Russia",
    title: "Function",
    description: "Дизайн Function. Фёдор Бельтюгов.",
    url: getConfig().baseUrl,
    images: "/og.jpg",
  },
  alternates: {
    canonical: new URL(getConfig().baseUrl),
  },
};

const cera = localFont({
  src: [
    {
      path: "./_fonts/CeraPro-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./_fonts/CeraPro-Medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "./_fonts/CeraPro-Bold.woff",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-cera",
  preload: true,
  fallback: ["sans-serif"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { baseUrl } = getConfig();

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Compass",
    url: baseUrl,
    sameAs: [],
    logo: baseUrl + "/favicon.ico",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+7-999-999-99-99",
      contactType: "Customer Service",
      areaServed: "RU",
      availableLanguage: ["Russian"],
    },
  };

  return (
    <html className="" lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={baseUrl.toString()} key="canonical" />
        {/* <script */}
        {/*   type="text/javascript" */}
        {/*   dangerouslySetInnerHTML={{ __html: yandexMetrika }} */}
        {/* /> */}
        {/* <meta name="yandex-verification" content="44500bcd7d698cec" /> */}
        {/* <noscript><div><img src="https://mc.yandex.ru/watch/103342681" style={{ position: 'absolute', left: '-9999px' }} alt="" /></div></noscript> */}
      </head>
      <body className={`${cera.variable} antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
