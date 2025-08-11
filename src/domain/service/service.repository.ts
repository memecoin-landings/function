import Service from "./service";

export default interface ServiceRepository {
  list(): Service[];
  getBySlug(slug: string): Service | undefined;
}
