import BehanceIcon from "@/components/common/behance-icon";
import InstagramIcon from "@/components/common/instagram-icon";
import UnknownIcon from "@/components/common/unknown-cw";
import CustomCursor from "@/components/custom-cursor";
import Header from "@/components/layout/header/header";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="h-screen relative overflow-hidden">
      <Header className="pt-5 xs:pt-7"/>
      <CustomCursor />
      {/* Container for the entire 404 design */}
      <div className="w-full h-full flex flex-col items-center justify-center">

        {/* Large 404 SVG - positioned as background */}
        <div className="relative sm:block items-center">
          <svg
            width="auto"
            height="auto"
            viewBox="0 0 1207 486"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-[clamp(12rem,50vh,30rem)] opacity-100"
            style={{
              transform: "rotate(0deg)",
            }}
          >
            <path
              d="M388.37 319.5V400.44H328.73V477.12H232.88V400.44H0V374.88L144.84 8.52H243.53L119.28 319.5H232.88V188.15H328.73V319.5H388.37ZM416.88 239.27C416.88 167.32 432.74 109.58 464.45 66.03C496.16 22.01 542.31 0 602.9 0C663.49 0 709.4 22.01 740.64 66.03C772.35 109.58 788.21 167.32 788.21 239.27C788.21 311.22 772.12 370.86 739.93 416.77C707.74 462.68 662.07 485.64 602.9 485.64C543.73 485.64 497.35 462.68 465.16 416.77C432.97 370.86 416.88 311.69 416.88 239.27ZM689.52 239.98C689.52 139.16 660.65 88.75 602.9 88.75C545.15 88.75 515.57 139.16 515.57 239.98C515.57 340.8 544.68 396.89 602.9 396.89C661.12 396.89 689.52 344.59 689.52 239.98ZM1206.23 319.5V400.44H1146.59V477.12H1050.74V400.44H817.86V374.88L962.7 8.52H1061.39L937.14 319.5H1050.74V188.15H1146.59V319.5H1206.23Z"
              fill="#FF3F1A"
            />
          </svg>

          {/* Humorous messages overlaid on top left of 404 */}
          <div className="relative sm:absolute bottom-105 ml-11.5 mr-11.5 sm:text-left lg:top-[20%] lg:left-[0%] z-20 sm:top-[30.5%] sm:left-[3%]">
            <p className="text-white text-[1.5625rem] leading-[1.75rem] lg:text-[3.375rem] lg:leading-[4.125rem] sm:text-[2.25rem] sm:leading-[2.75rem] font-medium font-cera-pro">
              Well, isn&apos;t this just f*ing great? <br className="hidden sm:block" />
              How did you even get here?
            </p>
          </div>

          {/* Link overlaid on bottom right of 404 */}
          <div className="relative bottom-40 text-center sm:absolute sm:block sm:text-left lg:bottom-[-2%] lg:right-[2%] z-20 sm:bottom-[16%] sm:right-[8.75%]" custom-cursor="hover">
            <Link
              href="/"
              className="text-white text-[1.5625rem] lg:text-[3.375rem] lg:leading-[4.125rem] sm:text-[2.25rem] sm:leading-[2.75rem] font-medium font-cera-pro inline-block"
            >
              Head back to the good stuff
              {/* using this instead of underline to make it more configurable */}
              <span className="block w-full lg:h-1 h-0.5 bg-white mt-0.25"></span>
            </Link>
          </div>
        </div>

        {/* Move footer outside the main content container to the very bottom of the page */}
        <footer className="flex flex-row w-full @container items-center pl-11.25 sm:pl-18.25 md:pl-34.5 pb-12.5 absolute left-0 bottom-0">
          <div className="flex flex-col xs:flex-row xs:flex-wrap w-[42cqw] xs:w-1/2 xs:items-center space-x-5 @container pr-[6.3cqw] md:pr-0">
            <p className="text-[8.6cqw] xs:text-[0.875rem] md:text-[clamp(0.875rem,1.7cqw,1.25rem)] tracking-[-3%] mb-2.5 md:mb-0 whitespace-nowrap">
              Discover our work on:
            </p>
            <div className="flex flex-row space-x-2.5 md:space-x-5">
              <InstagramIcon className="w-6.25 md:w-8.75 fill-[#F0EDE8] hover:fill-[#FF3F1A] " />
              <BehanceIcon className="w-6.25 md:w-8.75 fill-[#F0EDE8] hover:fill-[#FF3F1A] " />
              <UnknownIcon className="w-6.25 md:w-8.75 fill-[#F0EDE8] hover:fill-[#FF3F1A] " />
            </div>
          </div>
          <div className="flex flex-row w-[58cqw] xs:w-1/2 items-center pt-1">
            <div className="text-[#727272] text-[0.438rem] xs:text-[0.563rem] md:text-[0.875rem]">
              © Functional Design Studio. All rights reserved
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
} 
