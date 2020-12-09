import { Banner, initializeBanner } from "./Banner";
import { ImageMap, ImageMap_transformedHotZones_linkedContent } from "../../queries/fragments/__generated__/ImageMap";

/**
 * @category ViewModels
 */
export interface Coordinates {
  x: number | null;
  y: number | null;
}

/**
 * @category ViewModels
 */
export interface Crop {
  name: string;
  coords: Array<Coordinates>;
}

/**
 * @category ViewModels
 */
export interface Hotzone {
  crops?: Array<Crop>;
  points?: Array<Coordinates>;
  alt: string | null;
  shape: string | null;
  target: string | null;
  displayAsInlineOverlay: boolean | null;
  inlineOverlayTheme: string | null;
  linkedContent: ImageMap_transformedHotZones_linkedContent | null;
}

/**
 * @category ViewModels
 */
export interface ImagemapBanner extends Banner {
  hotzones?: Array<Hotzone>;
}

/**
 * Returns an [[ImagemapBanner]] object based on the GraphQL [[ImageMap]]
 * @param person
 * @param rootSegment Needed for link building
 */
export const initializeImagemapBanner = (imageMap: ImageMap, rootSegment: string): ImagemapBanner => {
  const imagemapBanner: ImagemapBanner = initializeBanner(imageMap, rootSegment) as ImagemapBanner;
  imagemapBanner.hotzones = imageMap.transformedHotZones as Array<Hotzone>;
  imagemapBanner.overlayConfiguration = { ...imageMap.overlayConfiguration, ...imagemapBanner.overlayConfiguration };
  return imagemapBanner;
};
