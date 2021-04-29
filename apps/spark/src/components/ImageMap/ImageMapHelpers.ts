import { Crop, Hotzone, Coordinates } from "../../models/Banner/ImagemapBanner";
import { Dispatchable } from "../../utils/ViewDispatcher/Dispatchable";

export interface OverlayConfiguration {
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

export const center = (rect: Rect): Point => {
  return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
};

export const boundingBox = (points: Array<Coordinates>): Rect | undefined => {
  if (points != null) {
    const x = points.reduce((a, p) => Math.min(a, p.x as number), Number.MAX_VALUE);
    const y = points.reduce((a, p) => Math.min(a, p.y as number), Number.MAX_VALUE);
    const x2 = points.reduce((a, p) => Math.max(a, p.x as number), 0);
    const y2 = points.reduce((a, p) => Math.max(a, p.y as number), 0);
    const width = x2 - x;
    const height = y2 - y;
    return { x, y, width, height };
  }
  return undefined;
};

export interface HotZoneProps {
  rect?: Rect;
  position?: Point;
  self?: Dispatchable;
  crop: Crop;
  shape?: string | null;
}

export const createHotZoneProps = (hotZone: Hotzone, crop: Crop): HotZoneProps => {
  const rect: Rect | undefined = boundingBox(crop.coords);
  const position = rect && center(rect);
  return {
    crop,
    rect,
    position,
    self: hotZone.linkedContent as Dispatchable,
    shape: hotZone.shape,
  };
};

export const createHotZoneList = (
  cropName: string | undefined,
  hotzones?: Array<Hotzone>
): Array<HotZoneProps | null | undefined> | undefined => {
  if (!hotzones || !cropName) {
    return undefined;
  }

  return hotzones.map((hotZone) => {
    if (hotZone && hotZone.crops) {
      const crop: Crop | undefined = hotZone.crops.find((coord) => coord && cropName === coord.name);
      return crop && createHotZoneProps(hotZone, crop);
    }
    return undefined;
  });
};

export interface Rect extends Point, Dimension {}
