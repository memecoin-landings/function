import Image, { StaticImageData } from "next/image";
import { Ref } from "react";

export class ProjectCardParams {
  image: StaticImageData;
  title?: string | undefined;
  subtitle?: string | undefined;

  constructor(
    image: StaticImageData,
    title?: string | undefined,
    subtitle?: string | undefined
  ) {
    this.image = image;
    this.title = title;
    this.subtitle = subtitle;
  }
}

export default function ProjectCard({
  data,
  className,
  ref,
  ...rest
}: {
  data: ProjectCardParams;
  ref?: Ref<HTMLDivElement>
  className: string;
  [key: string]: unknown;
}) {
  return (
    <div
      {...rest}
      ref={ref}
      className={`${className} group relative rounded-md flex flex-col items-start justify-end overflow-hidden cursor-pointer`}
      style={{ aspectRatio: '690/468' }}
    >
      <div className="text-left z-10 w-full px-5 py-5 max-w-[90%]">
        {data.title && (
          <p
            className="text-white text-3xl font-medium 
             opacity-0 translate-y-5 
             group-hover:opacity-100 group-hover:translate-y-0
             transition-all duration-500 ease-out delay-150"
          >
            {data.title}
          </p>
        )}
        {data.subtitle && (
          <p
            className="text-white text-[0.875rem] pt-2.5 leading-5 tracking-tight whitespace-normal 
             opacity-0 translate-y-5 max-h-0 
             group-hover:opacity-100 group-hover:translate-y-0 group-hover:max-h-[100px]
             transition-all duration-500 ease-out delay-150 overflow-hidden"
          >
            {data.subtitle}
          </p>
        )}
      </div>
      <div className="absolute inset-0">
        <Image
          src={data.image}
          alt={data.title ?? ""}
          fill
          priority
          className="object-cover transition-transform duration-650 group-hover:scale-105"
        />
      </div>
      {/* Gradient overlay that appears on hover */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent 
                     opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      ></div>
    </div>
  );
}
