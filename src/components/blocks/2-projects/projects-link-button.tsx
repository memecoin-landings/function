import Image from "next/image";
import type React from "react";
import arrowIcon from "@/../public/arrow.svg";

export default function ProjectLink() {
  return (
    <div className=" flex justify-end items-center  py-5">
      <span className="text-red-500 text-lg font-bold mr-5">All Projects</span>
      <Image
        src={arrowIcon}
        alt="Arrow"
        width={112}
        height={12}
        className="text-red-500"
      />
    </div>
  );
}
