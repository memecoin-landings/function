import React, { ReactNode } from "react";
import Image from "next/image";
import cross from "../../../public/icons/cross.svg";

export default function Modal({
  className,
  children,
  show,
  onClose,
}: {
  className?: string;
  children: ReactNode | ReactNode[];
  show: boolean;
  onClose: () => void;
}) {
  if (!show) return null;
  return (
    <div
      className={`${className} fixed bg-linear-to-b from-[rgba(0,0,0,0.8)] from-[17.75%] to-transparent left-0 right-0 top-0 bottom-0 z-1000`}
    >
      <div className="relative h-full w-full flex items-center justify-center">
        <div
          className="absolute top-0 right-0 left-0 bottom-0"
          onClick={onClose}
        />
        <div className="bg-white px-7.5 py-7.5 mx-4 relative">
          <div
            className="absolute top-7 right-6 p-1 cursor-pointer"
            onClick={onClose}
          >
            <Image src={cross} alt="Закрыть" />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
