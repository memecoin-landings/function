import { cn } from "@/lib/utils";

export default function HomeBlock({ className }: { className?: string }) {
  return (
    <section className={cn("relative w-full", className)}>
      <div className="flex flex-col @container">
        <div className="text-[#FF3F1A] font-bold leading-[16cqw] tracking-[-3%] text-[18.7cqw] whitespace-nowrap pl-2.5 xs:pl-0">
          Unique
          <br />
          Solutions —
        </div>
        <p className="text-5xl @container text-[3.75cqw] leading-[4.5cqw] mt-[-1.51em] relative z-10 font-medium md:pl-5 pl-2.5 md:pr-[9.58cqw] xs:px-2.5">
          Functionally and strategically refined design by a brand identity
          studio that solves business challenges, drives growth, and is based on
          in‑depth analysis
        </p>
      </div>
    </section>
  );
}
