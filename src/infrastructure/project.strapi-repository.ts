import "reflect-metadata";
import { injectable } from "tsyringe";
import Project from "../domain/project/project";
import ProjectRepository from "../domain/project/project.repository";
import ProjectMapper from "./project-mapper";
import StrapiClient from "./strapi/strapi-client";

@injectable()
export default class ProjectStrapiRepository implements ProjectRepository {
  constructor(private readonly strapiClient: StrapiClient) {}

  async list(tag?: string, limit?: number, skip?: number): Promise<Project[]> {
    const options: Record<string, unknown> = {
      populate: ["cover"],
      sort: ["weight:desc"],
      pagination: {
        start: skip,
        limit: limit,
      },
    };

    // Filter by tag if provided
    if (tag && tag !== "all") {
      options["filters"] = {
        tags: {
          $containsi: tag,
        },
      };
    }

    const response = await this.strapiClient.findAll(
      "api::project.project",
      "projects",
      options,
    );

    return response.data.map((project) =>
      ProjectMapper.strapiToProject(project),
    );
  }

  async getBySlug(slug: string): Promise<Project | undefined> {
    const response = await this.strapiClient.findAll(
      "api::project.project",
      "projects",
      {
        populate: ["cover"],
        filters: {
          slug: {
            $eq: slug,
          },
        },
        pagination: {
          limit: 1,
        },
      },
    );

    if (response.data.length === 0 || !response.data[0]) {
      return undefined;
    }

    return ProjectMapper.strapiToProject(response.data[0]);
  }
}
