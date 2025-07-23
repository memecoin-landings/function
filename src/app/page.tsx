import Header from "@/components/blocks/0-header/header";
import HomeBlock from "@/components/blocks/1-home/home-block";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main className="flex flex-col items-center sm:items-start">
      <Header />
      <HomeBlock />
    </main>
  );
}
