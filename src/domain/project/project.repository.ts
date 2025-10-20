import Project from "./project";

export default interface ProjectRepository {
  list(tag?: string, limit?: number, skip?: number): Project[] | Promise<Project[]>;
  getBySlug(slug: string): Project | undefined | Promise<Project | undefined>;
}
