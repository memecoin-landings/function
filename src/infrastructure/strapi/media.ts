export type MediaPart = {
  name?: string;
  ext?: string;
  mime?: string;
  url: string;
  width: number;
  height: number;
};

export type OriginalMediaPart = MediaPart & {
  id: string;
  caption: string;
  alt: string;
  src: string;
};

export type VideoMedia = OriginalMediaPart & {
  id: string;
  type: "video";
};

export type FrameMedia = OriginalMediaPart & {
  id: string;
  type: "iframe";
};

export type ImageMediaFormats = {
  thumbnail?: MediaPart;
  small?: MediaPart;
  medium?: MediaPart;
  large?: MediaPart;
};

export type ImageMedia = OriginalMediaPart & {
  type: "image";
  formats: ImageMediaFormats;
} & MediaPart;

export type Media = ImageMedia | FrameMedia | VideoMedia;

export type ImageData = ImageMedia & {
  id: number;
};
