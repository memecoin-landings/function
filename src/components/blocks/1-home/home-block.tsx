import { cn } from "@/lib/utils";

export default function HomeBlock({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        "relative w-full flex flex-col @container fluid-container",
        className
      )}
    >
      <div className="text-[#FF3F1A] font-bold leading-[16cqw] tracking-[-3%] text-[18.7cqw] whitespace-nowrap  xs:pl-0">
        Unique
        <br />
        Solutions —
      </div>
      <p className="text-5xl @container text-[3.75cqw] leading-[4.5cqw] mt-[-1.51em] relative z-10 font-medium">
        Functionally and strategically refined design by a brand identity studio
        that solves business challenges, drives growth, and is based on in‑depth
        analysis
      </p>
    </section>
  );
}
