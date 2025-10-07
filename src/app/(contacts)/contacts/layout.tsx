import SmoothScroll from "@/components/common/smooth-scroll";
import ToastProvider from "@/components/common/toast-provider";
import CustomCursor from "@/components/custom-cursor";
import CookieConsent from "@/components/layout/accept-cookies";
import Header from "@/components/layout/header/header";
import Loader from "@/components/layout/loader";

export default function ContactsLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  
    return (
      <ToastProvider>
        <Header className="xs:mt-7 mt-5 bg-white" />
        <CookieConsent />
        <CustomCursor />
        <SmoothScroll />
        {children}
        {/* <Loader /> */}
      </ToastProvider>
    );
  }