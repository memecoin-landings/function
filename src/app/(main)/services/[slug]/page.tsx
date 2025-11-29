/* eslint-disable @typescript-eslint/no-explicit-any */
import ProjectsBlock from "@/components/blocks/2-projects/projects-block";
import ServicesBlock from "@/components/blocks/3-services/services-block";
import ServiceMainBlock from "@/components/blocks/service/1-main/service-main-block";
import ServiceStepsBlock from "@/components/blocks/service/2-steps/service-steps-block";
import ServicePojoRepository from "@/infrastructure/service.pojo-repository";
import { notFound } from "next/navigation";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const services = ServicePojoRepository.getInstance().list();
  return services.map((service) => ({
    slug: service.slug,
  }));
}

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params
  const service = ServicePojoRepository.getInstance()
    .list()
    .find((service) => service.slug === slug);
  if (!service) {
    notFound(); // стандартный вызов Next.js для 404
  }
  return (
    <main className="flex flex-col items-center xs:items-start md:pt-25 xs:pt-17.5 pt-32 md:pb-50 xs:pb-25 pb-17.5 w-full">
      <ServiceMainBlock
        className="md:px-[9.6cqw]"
        service={{ ...service } as any}
      />
      <ServiceStepsBlock
        service={{ ...service } as any}
        className="md:mt-37.5 xs:mt-25 mt-17.5 md:px-[9.6cqw]"
      />
      <ProjectsBlock
        title="Completed Projects"
        tag={service?.slug || "all"}
        className="md:mt-37.5 xs:mt-25 mt-10.5"
      />
      <ServicesBlock
        title=""
        currentService={service?.slug}
        className="md:mt-37.5 xs:mt-18 mt-10.5 "
      />
    </main>
  );
}
