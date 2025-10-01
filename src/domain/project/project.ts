import { StaticImageData } from "next/image";

export default class Project {
  public title: string;
  public image: StaticImageData;
  public description: string;
  public topics: string[] = [];
  public tags: string[] = [];
  public weight: number = 0;
  public slug?: string;
  constructor({
    title,
    image,
    description,
    services: topics,
    tags,
    weight,
    slug,
  }: {
    title: string;
    image: StaticImageData;
    description?: string | undefined;
    services?: string[] | undefined;
    tags?: string[] | undefined;
    weight: number;
    slug?: string | undefined;
  }) {
    this.title = title;
    this.description = description ?? "";
    this.image = image;
    this.tags = tags ?? [];
    this.weight = weight;
    this.slug = slug ?? title.toLowerCase().replace(/\s+/g, "-");
    this.topics = topics ?? [];
  }
}
