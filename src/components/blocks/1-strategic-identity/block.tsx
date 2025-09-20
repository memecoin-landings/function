"use client";

import WebGLBlurEffect from "../../blur/webgl-blur-component";

export default function StrategicIdentityBlock() {
  return (
    <section className="w-full flex flex-col @container max-w-screen overflow-hidden pt-2">
      <WebGLBlurEffect className="w-full bg-[#151516] pt-[1em]">
        <h1 className="text-[#FF3F1A] font-bold leading-[16cqw] tracking-[-3%] text-[18.7cqw] xs:pl-0"
        >Strategic Identity</h1>
      </WebGLBlurEffect>
      <h2 className="text-5xl pointer-events-none @container font-medium text-[3.75cqw] leading-[4.5cqw] mt-[-1.51em] relative z-10 pl-5 pr-34.5"
      >The studio&apos;s mission is to create functional and aesthetically refined brand identities that address key business challenges, drive growth, and open new markets. Combining analytics, art, and creativity, we deliver unique solutions that achieve tangible results.</h2>
    </section>
  );
}