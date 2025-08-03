import Link from "next/link";

export default function NotFound() {
  return (
    <body className="h-screen bg-[#151516] relative overflow-hidden">
      {/* Container for the entire 404 design */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center">
        
        {/* Large 404 SVG - positioned as background */}
        <div className="relative">
          <svg 
            width="100%"
            height="auto"
            viewBox="0 0 1207 486"
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-80 h-auto md:w-[75rem] md:h-[30rem] opacity-100"
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
          <div className="absolute top-0 left-0 md:top-8 md:left-8 z-20">
            <p className="text-white text-sm md:text-[3.375rem] md:leading-[4.125rem] font-medium font-cera-pro">
            Well, isn&apos;t this just f*ing great?<br />
            How did you even get here?
            </p>
          </div>

          {/* Link overlaid on bottom right of 404 */}
          <div className="absolute bottom-0 right-0 md:bottom-8 md:right-8 z-20">
            <Link 
              href="/"
              className="text-white text-sm md:text-[3.375rem] md:leading-[4.125rem] font-medium font-cera-pro hover:text-white transition-colors duration-200 relative group"
            >
              Head back to the good stuff
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-100 transition-transform duration-200 origin-left"></span>
            </Link>
          </div>
        </div>
      </div>
    </body>
  );
} 