import Project from "../domain/project/project";
import { GetValues } from "./strapi/types";
import ImageMapper from "./image-mapper";

type StrapiProject = GetValues<"api::project.project">;

export default class ProjectMapper {
  public static strapiToProject(
    data: StrapiProject & { documentId: string },
  ): Project {
    // Parse tags from comma-separated string
    const tags = data.tags
      ? data.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0)
      : [];

    // Map category to categories array
    const categories = data.category ? [data.category] : [];

    // Map cover image using ImageMapper
    if (!data.cover) {
      throw new Error(`Project ${data.title} is missing cover image`);
    }

    const image = ImageMapper.strapiToImage(data.cover);

    return new Project({
      title: data.title ?? "Untitled",
      slug: data.slug,
      image,
      body: data.body,
      categories,
      tags,
      weight: data.weight ?? 0,
    });
  }
}
