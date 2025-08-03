import { StaticImageData } from "next/image";

export default class Project {
  public title = "";
  public description = "";
  public image: StaticImageData;
  public slug;
  public tags: string[] = [];
  public weight: number = 0;

  constructor(
    title: string,
    image: StaticImageData,
    description: string,
    tags: string[] = [],
    weight: number = 0,
    slug?: string,
  ) {
    this.title = title;
    this.description = description;
    this.image = image;
    this.tags = tags;
    this.weight = weight;
    this.slug = slug || title.toLowerCase().replace(/\s+/g, "-");
  }
}
