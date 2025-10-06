"use client";

import WebGLBlurEffect from "../../blur/webgl-blur-component";

export default function StrategicIdentityBlock({ className }: { className?: string }) {
  return (
    <section className={`w-full flex flex-col @container max-w-screen overflow-hidden pt-2 pl-2.5 xs:pl-0 ${className}`}>
      <WebGLBlurEffect className="w-full bg-[#151516] pt-[0.1em] md:text-[19.25cqw] xs:text-[18.23cqw] text-[16cqw] pb-[0.1em]">
        <div className="text-[#FF3F1A] font-bold leading-[16cqw] xs:leading-[15.36cqw] tracking-[-3%]  xs:pl-0"
        >Strategic Identity</div>
      </WebGLBlurEffect>
      <h2 className="text-5xl pointer-events-none @container font-medium md:text-[3.85cqw] xs:text-[4.6875cqw] text-[3.5cqw] leading-[4.5cqw] mt-[calc(-2em-2px)] relative z-10 md:pl-5 xs:pl-2.5 md:pr-34.5 pr-2.5 pl-2.5"
      >The studio&apos;s mission is to create functional and aesthetically refined brand identities that address key business challenges, drive growth, and open new markets. Combining analytics, art, and creativity, we deliver unique solutions that achieve tangible results.</h2>
    </section>
  );
}
