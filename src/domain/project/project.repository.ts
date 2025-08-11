import Project from "./project";

export default interface ProjectRepository {
  list(tag?: string): Project[];
  getBySlug(slug: string): Project | undefined;
}
