"use client";

import ServicesBlock from "@/components/blocks/3-services/services-block";
import ClientsBlock from "@/components/blocks/4-clients/clients-block";
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
      <ServiceMainBlock service={service!} />
      <ServiceStepsBlock service={service!} />
      <ServicesBlock className="md:mt-39 xs:mt-18 mt-10.5" />
      <ClientsBlock className="md:mt-42.5 xs:mt-25 mt-17.5" />
    </main>
  );
}
