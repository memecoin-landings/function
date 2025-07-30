import HomeBlock from "@/components/blocks/1-home/home-block";
import ProjectsBlock from "@/components/blocks/2-projects/projects-block";
import ServicesBlock from "@/components/blocks/3-services/services-block";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main className="flex flex-col items-center sm:items-start">
      <HomeBlock />
      <ProjectsBlock />
      <ServicesBlock />
    </main>
  );
}
