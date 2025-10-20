import NextImage from "next/image";
import { Ref } from "react";
import DomainImage from "../../domain/image";

export class ProjectCardParams {
  image: DomainImage;
  title?: string | undefined;
  subtitle?: string | undefined;

  constructor(
    image: DomainImage,
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
      <div className="absolute text-left z-10 md:left-5 md:bottom-5 left-2.5 bottom-2
        group-hover:opacity-100 group-hover:translate-y-0 
        opacity-0 translate-y-full transition-all duration-500 ease-out delay-150">
        {data.title && (
          <p
            className="text-[#F0EDE8] md:text-3xl text-xl font-medium "
          >
            {data.title}
          </p>
        )}
        {data.subtitle && (
          <p
            className="text-[#F0EDE8] md:text-[0.875rem] text-[0.625rem] md:pt-2.5 pt-1 tracking-[-3%] whitespace-normal overflow-hidden"
          >
            {data.subtitle}
          </p>
        )}
      </div>
      <div className="absolute inset-0">
        <NextImage
          src={data.image.getMiddlestSmallFirst()?.url ?? ""}
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
