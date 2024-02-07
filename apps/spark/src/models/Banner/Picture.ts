import { CmPicture } from "@coremedia-labs/graphql-layer";
import { PreviewMetadata, getPropertyName } from "../../utils/Preview/MetaData";
import { addProperty, mapProperties } from "../../utils/ViewDispatcher/ModelHelper";

export interface SupportsPicture extends PreviewMetadata {
  picture?: Picture;
}

export const addPicture = (self: any, result: SupportsPicture): void => {
  if (self.picture) {
    self.picture && addProperty(result, "picture", initializePicture(self.picture), getPropertyName(self, "picture"));
  }
};

/**
 * @category ViewModels
 */
export interface Picture extends PreviewMetadata {
  title?: string | null;
  alt?: string | null;
  uriTemplate: string | null;
  data: { uri: string | null } | null;
}

/**
 * @category ViewModels
 */
export interface ImageProps {
  picture: Picture;
  cropName?: string;
  width?: number;
  aspectRatio?: string;
}

/**
 * @category ViewModels
 */
export interface ResponsiveImageProps {
  picture: Picture;
  sources: Array<Source>;
}

/**
 * @category ViewModels
 */
export interface Source {
  media?: string;
  srcset: string;
  sizes?: string;
  type?: string;
}

/**
 * Returns a [[Picture]] object based on the GraphQL picture
 * @param picture
 */
export const initializePicture = (picture: CmPicture): Picture => {
  return {
    ...mapProperties(picture, {
      title: "title",
      alt: "alt",
      uriTemplate: "uriTemplate",
      data: "data",
    }),
  };
};
