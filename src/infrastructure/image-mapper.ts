import Image from "../domain/image";
import { ImageData } from "./strapi/media";

export default class ImageMapper {
  public static strapiToImage(data: ImageData): Image {
    return new Image(data);
  }
}
