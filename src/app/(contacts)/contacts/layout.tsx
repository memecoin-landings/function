import SmoothScroll from "@/components/common/smooth-scroll";
import ToastProvider from "@/components/common/toast-provider";
import CustomCursor from "@/components/custom-cursor";
import CookieConsent from "@/components/layout/accept-cookies";
import Header from "@/components/layout/header/header";
import Loader from "@/components/layout/loader";

// export const dynamic = "force-dynamic";

export default function ContactsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className="bg-[#F0EDE8] xs:pt-7 pt-5 ">
      <ToastProvider>
        <Header className="" />
        <CookieConsent />
        <CustomCursor />
        <SmoothScroll />
        {children}
        <Loader />
      </ToastProvider></div>
  );
}
