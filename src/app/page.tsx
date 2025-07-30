import HomeBlock from "@/components/blocks/1-home/home-block";
import ServicesBlock from "@/components/blocks/3-services/services-block";
import ClientsBlock from "@/components/blocks/4-clients/clients-block";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main className="flex flex-col items-center sm:items-start">
      <HomeBlock />
      <ServicesBlock />
      <ClientsBlock className="md:mt-42.5 sm:mt-25 mt-17.5" />
    </main>
  );
}
