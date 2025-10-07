"use client";

import ProjectsBlock from "@/components/blocks/2-projects/projects-block";
import ServicesBlock from "@/components/blocks/3-services/services-block";
import ServiceMainBlock from "@/components/blocks/service/1-main/service-main-block";
import ServiceStepsBlock from "@/components/blocks/service/2-steps/service-steps-block";
import ServicePojoRepository from "@/infrastructure/service.pojo-repository";
import { redirect, useParams } from "next/navigation";

export default function ServicePage() {
  const { slug } = useParams();
  const service = ServicePojoRepository.getInstance()
    .list()
    .find((service) => service.slug === slug);
  if (!service) {
    redirect("/not-found")
  }
  return (
    <main className="flex flex-col items-center xs:items-start md:pt-38.5 xs:pt-23.5 pt-27.25 md:pb-50 xs:pb-25 pb-17.5 w-full">
      <ServiceMainBlock
        className="md:px-[9.6cqw]"
        service={service}
      />
      <ServiceStepsBlock
        service={service}
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
