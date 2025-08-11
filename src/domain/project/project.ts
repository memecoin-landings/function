import { StaticImageData } from "next/image";

export default class Project {
  constructor(
    public title: string,
    public image: StaticImageData,
    public description: string,
    public tags: string[] = [],
    public weight: number = 0,
    public slug?: string,
  ) {
    this.title = title;
    this.description = description;
    this.image = image;
    this.tags = tags;
    this.weight = weight;
    this.slug = slug ?? title.toLowerCase().replace(/\s+/g, "-");
  }
}
