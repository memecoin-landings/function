import ArrowSVG from "@/components/common/arrow";

export default function ProjectLink() {
  return (
    <div className="flex justify-end py-5 cursor-pointer">
      <div className="group items-center flex-row flex">
        <span className="group-hover:text-[#FF3F1A] text-lg font-medium mr-5 transition-colors duration-300">
          All Projects
        </span>
        <ArrowSVG className="fill-white group-hover:fill-[#FF3F1A] group-hover:translate-x-1 transition-all duration-300"></ArrowSVG>
      </div>
    </div>
  );
}
