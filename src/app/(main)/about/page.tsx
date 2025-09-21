import ServicesBlock from "@/components/blocks/3-services/services-block";
import ClientsBlock from "@/components/blocks/4-clients/clients-block";
import StrategicIdentityBlock from "@/components/blocks/1-strategic-identity/block";
import FedorAboutBlock from "@/components/blocks/2-fedor-about/fedor-about-block";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="flex flex-col items-center sm:items-start md:pt-25.75 xs:pt-18.25 pt-17.5 pb-25.75 md:pb-51.25 xs:pb-26">
      <StrategicIdentityBlock />
      <FedorAboutBlock className="md:mt-42.5 xs:mt-25 mt-17.5" />
      <ClientsBlock className="md:mt-42.5 xs:mt-25 mt-17.5" />
      <ServicesBlock className="md:mt-39 xs:mt-18 mt-10.5" />

      <Link
        href="/projects"
        className="sm:pl-5 w-fit sm:mt-12.5 mt-8 items-left"
      >
        <span className="text-white hover:text-[#FF3F1A] border-b-2 border-white hover:border-[#FF3F1A] transition-colors duration-200 pb-1 text-[5vw] sm:text-[3.125cqw] font-medium leading-[6vw] sm:leading-[3.875cqw]">
          Let's Build Your Brand
        </span>
      </Link>
    </main>
  );
}