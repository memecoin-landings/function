import ServicesBlock from "@/components/blocks/3-services/services-block";
import ClientsBlock from "@/components/blocks/4-clients/clients-block";
import StrategicIdentityBlock from "@/components/blocks/1-strategic-identity/block";
import FedorAboutBlock from "@/components/blocks/2-fedor-about/fedor-about-block";

export default function AboutPage() {
  return (
    <main className="flex flex-col items-center sm:items-start md:pt-25.75 xs:pt-18.25 pt-17.5 pb-25.75 md:pb-51.25 xs:pb-26">
      <StrategicIdentityBlock />
      <FedorAboutBlock className="md:mt-42.5 xs:mt-25 mt-17.5" />
      <ClientsBlock className="md:mt-42.5 xs:mt-25 mt-17.5" />
      <ServicesBlock className="md:mt-39 xs:mt-18 mt-10.5" />
    </main>
  );
}