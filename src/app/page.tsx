import HomeBlock from "@/components/blocks/1-home/home-block";
import ServicesBlock from "@/components/blocks/3-services/services-block";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main className="flex flex-col items-center sm:items-start md:pt-25.75 xs:pt-18.25 pt-17">
      <HomeBlock className="" />
      <ServicesBlock />
    </main>
  );
}
