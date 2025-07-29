import Image, { StaticImageData } from "next/image";

export class BgImageParam {
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

export default function BgImageCard({
  data,
  className,
}: {
  data: BgImageParam;
  className: string;
}) {
  return (
    <div
      className={`${className} relative h-[468px] rounded-md  flex flex-col items-start justify-end  overflow-hidden`} // Добавлен overflow-hidden
    >
      <div className="text-left z-10 w-full px-5 py-5 max-w-[90%]">
        {data.title && (
          <p className="text-white text-3xl font-medium">{data.title}</p>
        )}
        {data.subtitle && (
          <p className="text-white text-[0.875rem] pt-2.5 leading-5 tracking-tight whitespace-normal">
            {data.subtitle}
          </p>
        )}
      </div>
      <div className="absolute inset-0">
        <Image
          src={data.image}
          alt={data.title ?? ""}
          fill
          sizes="(max-width: 468px) 100vw, 50vw"
          priority
          className="object-cover transition-transform duration-650 hover:scale-105" // Уменьшено до scale-105
        />
      </div>
    </div>
  );
}
