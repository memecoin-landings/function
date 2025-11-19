"use client";

import WebGLBlurEffect from "../../blur/webgl-blur-component";

export default function StrategicIdentityBlock({ className }: { className?: string }) {
  return (
    <section className={` w-full flex flex-col @container max-w-screen overflow-hidden pl-2.5 xs:pl-0 -mt-[2.4cqw] ${className}`}>
      <WebGLBlurEffect className="w-full bg-[#151516] pt-[2.4cqw] pb-[3.2cqw] -mb-[3.2cqw] ">
        <div className="text-[#FF3F1A] font-bold md:leading-[15.22cqw] xs:leading-[15.36cqw] leading-[15.37cqw] tracking-mid xs:text-[18.229cqw] md:text-[18.75cqw] text-[18.29cqw] whitespace-nowrap"
        >
          Strategic
          <br />
          Identity
          {/* Unique */}
          {/* <br /> */}
          {/* Solutions — */}
        </div>
      </WebGLBlurEffect>
      <p className="pointer-events-none font-medium md:text-[3.85cqw] xs:text-[4.6875cqw] text-[5.96cqw] md:leading-[4.5cqw] xs:leading-[5.73cqw] leading-[7.36cqw] md:mt-[-1.37em] xs:mt-[-1.37em] mt-[-1.28em] relative z-10 md:pl-5 xs:pl-2.5 md:pr-34.5 pr-2.5"
      >The studio&apos;s mission is to create functional and aesthetically refined brand identities that address key business challenges, drive growth, and open new markets. Combining analytics, art, and creativity, we deliver unique solutions that achieve tangible results.</p>
    </section>
  );
}
