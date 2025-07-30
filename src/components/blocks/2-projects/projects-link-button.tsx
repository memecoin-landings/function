import ArrowSVG from "@/components/common/arrow";

export default function ProjectLink() {
  return (
    <div className="group flex justify-end items-center py-5 cursor-pointer">
      <span className="group-hover:text-[#FF3F1A] text-lg font-bold mr-5">
        All Projects
      </span>
      <ArrowSVG className="fill-white group-hover:fill-[#FF3F1A]"></ArrowSVG>
    </div>
  );
}
