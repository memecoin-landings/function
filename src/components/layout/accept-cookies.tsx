"use client";

import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

function CookieConsent() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let ti: NodeJS.Timeout;
    // Check if acceptedCookies cookie exists
    const cookies = document.cookie.split('; ').find(row => row.startsWith('acceptedCookies='));
    const accepted = cookies ? cookies.split('=')[1] === 'true' : false;
    if (!accepted) {
      ti = setTimeout(() => {
        setIsVisible(true);
      }, 5000)
    }
    return () => clearTimeout(ti);
  }, []);

  const handleAccept = () => {
    document.cookie = 'acceptedCookies=true; max-age=31536000; path=/';
    setIsVisible(false);
  };

  return (
    <div className={cn(
      "fixed z-100 bottom-0 left-0 right-0",
      "bg-[#FF3F1A] text-[#F0EDE8] text-sm",
      "transition-transform duration-300 ease-in-out", isVisible ? "translate-y-0" : "translate-y-full",
    )}>
      <div className="fluid-container flex justify-between items-center px-26 py-4">
        We use cookies to provide you with the best experience on our website. To fully enjoy all features, we recommend accepting them
        <button onClick={handleAccept} className="text-[#F0EDE8] underline">Accept Cookies</button>
      </div>
    </div>
  );
}

export default CookieConsent;
