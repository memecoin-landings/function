import getConfig from "../config";
import { ImageMedia } from "../infrastructure/strapi/media";

type format = { url: string; width: number; height: number };

export default class Image {
  private _source?: format;

  private _large?: format;

  private _small?: format;

  private _medium?: format;

  private _thumbnail?: format;

  constructor(image: ImageMedia, baseUrl?: string) {
    const imageBaseUrl = baseUrl ?? getConfig().strapi.publicUrl;

    this._source = {
      url: `${imageBaseUrl}${image.url}`,
      width: image.width,
      height: image.height,
    };
    const formats = image.formats;
    if (formats?.large) {
      this._large = {
        url: `${imageBaseUrl}${formats.large.url}`,
        width: formats.large.width,
        height: formats.large.height,
      };
    }
    if (formats?.small) {
      this._small = {
        url: `${imageBaseUrl}${formats.small.url}`,
        width: formats.small.width,
        height: formats.small.height,
      };
    }
    if (formats?.medium) {
      this._medium = {
        url: `${imageBaseUrl}${formats.medium.url}`,
        width: formats.medium.width,
        height: formats.medium.height,
      };
    }
    if (formats?.thumbnail) {
      this._thumbnail = {
        url: `${imageBaseUrl}${formats.thumbnail.url}`,
        width: formats.thumbnail.width,
        height: formats.thumbnail.height,
      };
    }
  }

  getSource(): format | undefined {
    return this._source;
  }

  getLarge(): format | undefined {
    return this._large;
  }

  getMiddlestSmallFirst(): format | undefined {
    return (
      this._medium ??
      this._small ??
      this._large ??
      this._thumbnail ??
      this._source
    );
  }

  getMiddlestBigFirst(): format | undefined {
    return (
      this._medium ??
      this._large ??
      this._small ??
      this._source ??
      this._thumbnail
    );
  }

  getMedium(): format | undefined {
    return this._medium;
  }

  getSmall(): format | undefined {
    return this._small;
  }

  getThumbnail(): format | undefined {
    return this._thumbnail;
  }

  getBiggest(): format | undefined {
    return (
      this.getSource() ??
      this.getLarge() ??
      this.getMedium() ??
      this.getSmall() ??
      this.getThumbnail()
    );
  }

  getSmallest(): format | undefined {
    return (
      this.getThumbnail() ??
      this.getSmall() ??
      this.getMedium() ??
      this.getLarge() ??
      this.getSource()
    );
  }
}
