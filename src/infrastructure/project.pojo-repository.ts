import Project from "../domain/project/project";
import ProjectRepository from "../domain/project/project.repository";
import projects from "./projects";

export default class ProjectPojoRepository implements ProjectRepository {
  public static instance: ProjectPojoRepository | null = null;

  public static getInstance(): ProjectPojoRepository {
    if (!ProjectPojoRepository.instance) {
      ProjectPojoRepository.instance = new ProjectPojoRepository();
    }
    return ProjectPojoRepository.instance;
  }

  list(tag?: string): Project[] {
    if (tag === "all") return projects;
    return projects.filter((project) => !tag || project.tags.includes(tag));
  }

  getBySlug(slug: string): Project | undefined {
    return projects.find((project) => project.slug === slug);
  }
}
