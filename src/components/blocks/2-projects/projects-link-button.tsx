import ArrowSVG from "@/components/common/arrow";
import Link from "next/link";

export default function ProjectLink() {
  return (
    <div className="flex justify-end py-5 cursor-pointer">
      <div className="group items-center flex-row flex">
        <span className="group-hover:text-[#FF3F1A] text-lg font-medium mr-5 transition-colors duration-300">
          All Projects
        </span>
        <Link href="/projects">
          <ArrowSVG className="fill-white group-hover:fill-[#FF3F1A] group-hover:translate-x-1 transition-all duration-300"></ArrowSVG>
        </Link>
      </div>
    </div>
  );
}
