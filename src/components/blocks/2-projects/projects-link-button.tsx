import ArrowSVG from "@/components/common/arrow";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function ProjectLink({ className }: { className?: string }) {
  return (
    <Link href="/projects" className={cn("flex justify-end cursor-pointer", className)}>
      <div className="group items-center flex-row flex">
        <span className="group-hover:text-[#FF3F1A] text-[#F0EDE8] md:text-lg text-sm font-medium mr-5 transition-colors duration-300">
          All Projects
        </span>
        <ArrowSVG className="fill-[#F0EDE8] group-hover:fill-[#FF3F1A] group-hover:translate-x-1 transition-all duration-300 w-20! md:w-28.5!"></ArrowSVG>
      </div>
    </Link>
  );
}
