/**
 * @category ViewModels
 */
import { Teasable } from "@coremedia-labs/graphql-layer";
import { PreviewMetadata } from "../../utils/Preview/MetaData";
import { notEmpty } from "../../utils/Helpers";
import { Banner, initializeBanner } from "./Banner";

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
  linkedContent: Teasable;
}

export interface ImagemapOverlayConfiguration {
  displayTitle: boolean;
  displayShortText: boolean;
  displayPicture: boolean;
  displayDefaultPrice: boolean;
  displayDiscountedPrice: boolean;
  displayOutOfStockLink: boolean;
}

export interface Point {
  x: number;
  y: number;
}

export interface Dimension {
  width: number;
  height: number;
}

export interface Rect extends Point, Dimension {}

export interface HotZoneProps {
  rect?: Rect;
  position?: Point;
  self: Banner;
  name: string;
  shape?: string | null;
}

export interface SupportsImagemap extends PreviewMetadata {
  hotzones?: Array<Array<HotZoneProps>>;
  imagemapOverlayConfiguration?: ImagemapOverlayConfiguration;
}

export const supportsImagemap = (object: any): object is SupportsImagemap => {
  return "hotzones" in object;
};

export const addImagemap = (self: any, result: SupportsImagemap, rootSegment: string): void => {
  if ("transformedHotZones" in self) {
    result.hotzones = self.transformedHotZones
      .map((hotZone: any) => {
        if (hotZone.crops && hotZone.linkedContent) {
          return hotZone.crops.map((crop: Crop) => createHotZoneProps(hotZone, crop, rootSegment));
        }
        return null;
      })
      .filter(notEmpty);
    const imageMapOverlayConfig = self.overlayConfiguration?.overlay || {};
    result.imagemapOverlayConfiguration = {
      displayTitle: true,
      displayShortText: true,
      displayPicture: true,
      displayDefaultPrice: true,
      displayDiscountedPrice: true,
      displayOutOfStockLink: true,
      ...imageMapOverlayConfig,
    };
  }
};

const createHotZoneProps = (hotZone: Hotzone, crop: Crop, rootSegment: string): HotZoneProps => {
  const rect: Rect | undefined = boundingBox(crop.coords);
  const position = rect && center(rect);
  return {
    name: crop.name,
    rect: rect,
    position: position,
    self: initializeBanner(hotZone.linkedContent, rootSegment),
    shape: hotZone.shape,
  };
};

const boundingBox = (points: Array<Coordinates>): Rect | undefined => {
  const x = points.reduce((a, p) => Math.min(a, p.x as number), Number.MAX_VALUE);
  const y = points.reduce((a, p) => Math.min(a, p.y as number), Number.MAX_VALUE);
  const x2 = points.reduce((a, p) => Math.max(a, p.x as number), 0);
  const y2 = points.reduce((a, p) => Math.max(a, p.y as number), 0);
  const width = x2 - x;
  const height = y2 - y;
  return { x, y, width, height };
};

const center = (rect: Rect): Point => {
  return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
};
