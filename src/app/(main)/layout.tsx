import type { Metadata } from "next";
import "../globals.css";
import CustomCursor from "@/components/custom-cursor";
import getConfig from "@/config";
import ToastProvider from "@/components/common/toast-provider";
import Header from "@/components/layout/header/header";
import Footer from "@/components/blocks/6-footer/footer";
import SmoothScroll from "@/components/common/smooth-scroll";
import CookieConsent from "@/components/layout/accept-cookies";
import Loader from "../../components/layout/loader";

// export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  metadataBase: new URL(getConfig().baseUrl),
  title: "Function Design Studio — Global Remote-First Brand Identity Studio",
  description: "Function Design Studio is a global remote-first brand identity studio creating functional, aesthetic visual systems grounded in analytics and a clear understanding of business objectives.",
  keywords: ["дизайн", "фёдор", "белтюгов", "function"],
  openGraph: {
    type: "website",
    countryName: "Russia",
    title: "Function Design Studio — Global Remote-First Brand Identity Studio",
    description: "Function Design Studio is a global remote-first brand identity studio creating functional, aesthetic visual systems grounded in analytics and a clear understanding of business objectives.",
    url: getConfig().baseUrl,
    images: "/opengraph-image.jpg",
    siteName: "FunctionStudio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Function Design Studio — Global Remote-First Brand Identity Studio",
    description: "Function Design Studio is a global remote-first brand identity studio creating functional, aesthetic visual systems grounded in analytics and a clear understanding of business objectives.",
    images: "/twitter-image.jpg",
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
      <Header className="xs:mt-7 mt-5" />
      <CookieConsent />
      <CustomCursor />
      <SmoothScroll />
      {children}
      <Footer className="" />
      <Loader />
    </ToastProvider>
  );
}
