"use client";

import ProjectsBlock from "@/components/blocks/2-projects/projects-block";
import ServicesBlock from "@/components/blocks/3-services/services-block";
import ServiceMainBlock from "@/components/blocks/service/1-main/service-main-block";
import ServiceStepsBlock from "@/components/blocks/service/2-steps/service-steps-block";
import ServicePojoRepository from "@/infrastructure/service.pojo-repository";
import { useParams } from "next/navigation";

export default function ServicePage() {
  const { slug } = useParams();
  const service = ServicePojoRepository.getInstance()
    .list()
    .find((service) => service.slug === slug);
  return (
    <main className="flex flex-col items-center sm:items-start md:pt-25.75 xs:pt-18.25 pt-17 pb-25.75 md:pb-18.25 xs:pb-18.25 w-full">
      <ServiceMainBlock
        service={service!}
        className="md:pt-12.5 xs:pt-10 pt-10 px-8.75 md:px-[7.6cqw]"
      />
      <ServiceStepsBlock
        service={service!}
        className="md:pt-12.5 xs:pt-10 pt-10 px-8.75 md:px-[7.6cqw]"
      />
      <ProjectsBlock className="md:mt-39 xs:mt-18 mt-10.5" />
      <ServicesBlock className="md:mt-39 xs:mt-18 mt-10.5" />
    </main>
  );
}
