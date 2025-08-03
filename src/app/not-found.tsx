import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-full bg-[#151516] flex flex-col">
      {/* Main Content */}
      <main className="flex-1 flex flex-col justify-center items-center px-5 relative">
        {/* Humorous messages above 404 */}
        <div className="text-left w-full max-w-4xl mb-8">
          <p className="text-white text-lg sm:text-xl font-medium mb-2">
            Well, isn&apos;t this just f*ing great?
          </p>
          <p className="text-white text-lg sm:text-xl font-medium">
            How did you even get here?
          </p>
        </div>

        {/* Large 404 */}
        <div className="text-center mb-8">
          <h1 className="text-[#FF3F1A] text-8xl sm:text-9xl lg:text-[12rem] font-bold leading-none">
            404
          </h1>
        </div>

        {/* Link back to home */}
        <div className="text-left w-full max-w-4xl">
          <Link 
            href="/"
            className="text-white text-lg sm:text-xl font-medium hover:text-[#FF3F1A] transition-colors duration-200 relative group"
          >
            Head back to the good stuff
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#FF3F1A] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
          </Link>
        </div>
      </main>
    </div>
  );
} 