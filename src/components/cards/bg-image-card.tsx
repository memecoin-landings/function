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
      className={`${className} relative h-[468px] rounded-b-md pb-5 flex flex-col items-start justify-end overflow-hidden group/item mt-5`}
    >
      {/* Текстовый блок с отступами и ограничением ширины */}
      <div className="text-left z-10 w-full px-5 max-w-[90%]">
        <div>
          {data.title && (
            <p className="text-white text-3xl font-medium">{data.title}</p>
          )}
          {data.subtitle && (
            <p className="text-white text-[0.875rem] leading-5 tracking-tight whitespace-normal">
              {data.subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Фоновое изображение */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Image
          src={data.image}
          alt={data.title ?? ""}
          className="object-cover w-full h-full transition-transform duration-650 ease-in-out group-hover/item:scale-110"
          fill
        />
      </div>
    </div>
  );
}
