import type { Metadata } from "next";
import "./globals.css";
import getConfig from "@/config";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/common/theme-context";
import ToastProvider from "@/components/common/toast-provider";

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
        {/* <!-- Hybrid favicon setup: SVG + PNG + ICO with dark-mode support --> */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" media="(prefers-color-scheme: light)" />
        <link rel="icon" type="image/svg+xml" href="/favicon-dark.svg" media="(prefers-color-scheme: dark)" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#000000" />
        {/* <!-- Windows --> */}
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        {/* <script */}
        {/*   type="text/javascript" */}
        {/*   dangerouslySetInnerHTML={{ __html: yandexMetrika }} */}
        {/* /> */}
        {/* <meta name="yandex-verification" content="44500bcd7d698cec" /> */}
        {/* <noscript><div><img src="https://mc.yandex.ru/watch/103342681" style={{ position: 'absolute', left: '-9999px' }} alt="" /></div></noscript> */}
      </head>
      <body className={`${cera.variable} antialiased`}>
        <ThemeProvider>
          <ToastProvider>{children}</ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
