import HomeBlock from "@/components/blocks/1-home/home-block";
import ProjectsBlock from "@/components/blocks/2-projects/projects-block";
import ServicesBlock from "@/components/blocks/3-services/services-block";
import FedorBlock from "@/components/blocks/4-fedor/fedor-block";
import ClientsBlock from "@/components/blocks/4-clients/clients-block";
import Footer from "@/components/blocks/6-footer/footer";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main className="flex flex-col items-center sm:items-start md:pt-25.75 xs:pt-18.25 pt-17 pb-25.75 md:pb-18.25 xs:pb-18.25 w-full">
      <HomeBlock className="" />
      <ProjectsBlock className="md:pt-32.75 xs:pt-18.25 pt-17" />
      <ServicesBlock className="md:mt-39 xs:mt-18 mt-10.5" />
      <ClientsBlock className="md:mt-42.5 xs:mt-25 mt-17.5" />
      <FedorBlock className="md:mt-51.75 xs:mt-25 mt-17.5" />
      <Footer emailAddress="hello@functionaldesign.studio"/>
    </main>
  );
}
