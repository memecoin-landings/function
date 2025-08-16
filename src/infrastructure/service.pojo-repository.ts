import Service from "../domain/service/service";
import ServiceRepository from "../domain/service/service.repository";
import services from "./services";

export default class ServicePojoRepository implements ServiceRepository {
  public static instance: ServicePojoRepository | null = null;

  public static getInstance(): ServicePojoRepository {
    if (!ServicePojoRepository.instance) {
      ServicePojoRepository.instance = new ServicePojoRepository();
    }
    return ServicePojoRepository.instance;
  }

  list(): Service[] {
    return services;
  }

  getBySlug(slug: string): Service | undefined {
    return services.find((service) => service.slug === slug);
  }
}
