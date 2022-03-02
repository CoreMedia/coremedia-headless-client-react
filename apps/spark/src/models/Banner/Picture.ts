import PreviewMetadata, { getPropertyName } from "../../utils/Preview/MetaData";
import { Picture as GraphQLPicture } from "@coremedia-labs/graphql-layer";
import { addProperty, mapProperties } from "../../utils/ViewDispatcher/ModelHelper";

/**
 * @category ViewModels
 */
export interface Picture extends PreviewMetadata {
  title: string | null;
  alt: string | null;
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
export const initializePicture = (picture: GraphQLPicture): Picture => {
  return {
    ...mapProperties(picture, {
      title: "title",
      alt: "alt",
      uriTemplate: "uriTemplate",
      data: "data",
    }),
  };
};

export interface SupportsPicture extends PreviewMetadata {
  picture: Picture | null;
}

export const addPicture = (self: any, result: SupportsPicture): void => {
  if ("picture" in self) {
    self.picture && addProperty(result, "picture", initializePicture(self.picture), getPropertyName(self, "picture"));
  }
};
