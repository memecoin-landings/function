import HomeBlock from "@/components/blocks/1-home/home-block";
import ProjectsBlock from "@/components/blocks/2-projects/projects-block";
import ServicesBlock from "@/components/blocks/3-services/services-block";
import FedorBlock from "@/components/blocks/4-fedor/fedor-block";
import ClientsBlock from "@/components/blocks/4-clients/clients-block";

export default function Home() {
  return (
    <main className="flex flex-col items-center sm:items-start md:pt-25.75 xs:pt-18.25 pt-17">
      <HomeBlock className="" />
      <ProjectsBlock className="md:pt-32.75 xs:pt-18.25 pt-17" />
      <ServicesBlock />
      <ClientsBlock className="md:mt-42.5 xs:mt-25 mt-17.5" />
      <FedorBlock />
    </main>
  );
}
