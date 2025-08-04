import type { Metadata } from "next";
import "../globals.css";
import CustomCursor from "@/components/custom-cursor";
import getConfig from "@/config";
import ToastProvider from "@/components/common/toast-provider";
import Header from "@/components/layout/header/header";
import Footer from "@/components/blocks/6-footer/footer";
import SmoothScroll from "@/components/common/smooth-scroll";
import CookieConsent from "@/components/layout/accept-cookies";

export const metadata: Metadata = {
  metadataBase: new URL(getConfig().baseUrl),
  title: { default: "Function", template: "%s | Function" },
  description:
    "Дизайн Function. Фёдор Бельтюгов.",
  keywords: ["дизайн", "фёдор", "белтюгов", "function"],
  openGraph: {
    type: "website",
    countryName: "Russia",
    title: "Function",
    description:
      "Дизайн Function. Фёдор Бельтюгов.",
    url: getConfig().baseUrl,
    images: "/og.jpg",
  },
  alternates: {
    canonical: new URL(getConfig().baseUrl),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <ToastProvider>
      <Header />
      <CookieConsent />
      <CustomCursor />
      <SmoothScroll />
      {children}
      <Footer className="mt-40" emailAddress="hello@functionaldesign.studio" />
    </ToastProvider>
  );
}
