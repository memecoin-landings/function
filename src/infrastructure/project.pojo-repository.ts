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

  list(tag?: string, limit?: number, skip?: number): Project[] {
    let filtered = tag === "all" || !tag
      ? projects
      : projects.filter((project) => project.tags.includes(tag));

    // Apply skip and limit
    if (skip !== undefined) {
      filtered = filtered.slice(skip);
    }
    if (limit !== undefined) {
      filtered = filtered.slice(0, limit);
    }

    return filtered;
  }

  getBySlug(slug: string): Project | undefined {
    return projects.find((project) => project.slug === slug);
  }
}
