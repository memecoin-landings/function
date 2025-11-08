import Project from "../domain/project/project";
import { GetValues } from "./strapi/types";
import ImageMapper from "./image-mapper";
import { ImageData } from "./strapi/media";

type StrapiProject = GetValues<"api::project.project">;

export default class ProjectMapper {
  public static strapiToProject(
    data: StrapiProject & { documentId: string },
  ): Project {
    // Parse tags from comma-separated string
    const tags = data["tags"]
      ? (data["tags"] as string)
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0)
      : [];

    // Map category to categories array
    const categories = data["category"] ? [data["category"] as string] : [];

    // Map cover image using ImageMapper
    if (!data["cover"]) {
      throw new Error(`Project ${data["title"]} is missing cover image`);
    }

    const image = ImageMapper.strapiToImage(data["cover"] as ImageData);

    return new Project({
      title: (data["title"] as string) ?? "Untitled",
      slug: data["slug"] as string,
      image,
      body: data["body"],
      categories,
      tags,
      weight: (data["weight"] as number) ?? 0,
    });
  }
}
