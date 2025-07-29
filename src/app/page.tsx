import HomeBlock from "@/components/blocks/1-home/home-block";
import ServicesBlock from "@/components/blocks/3-services/services-block";
import FedorBlock from "@/components/blocks/4-fedor/fedor-block";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main className="flex flex-col items-center sm:items-start">
      <HomeBlock />
      <ServicesBlock />
      <FedorBlock />
    </main>
  );
}
