import Image from "../image";

export default class Project {
  public title: string;
  public image: Image;
  public body: unknown;
  public categories: string[] = [];
  public tags: string[] = [];
  public weight: number = 0;
  public slug?: string;
  constructor({
    title,
    image,
    body,
    categories,
    tags,
    weight,
    slug,
  }: {
    title: string;
    image: Image;
    body?: unknown;
    categories?: string[] | undefined;
    tags?: string[] | undefined;
    weight?: number;
    slug?: string | undefined;
  }) {
    this.title = title;
    this.body = body;
    this.image = image;
    this.tags = tags ?? [];
    this.weight = weight ?? 0;
    this.slug = slug ?? title.toLowerCase().replace(/\s+/g, "-");
    this.categories = categories ?? [];
  }
}
