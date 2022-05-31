import { PreviewMetadata, getPropertyName } from "../../utils/Preview/MetaData";
import { addProperty } from "../../utils/ViewDispatcher/ModelHelper";
import { Banner, initializeBannerFor } from "../Banner/Banner";
import { notEmpty } from "../../utils/Helpers";

/**
 * @category ViewModels
 */
export interface Slot extends PreviewMetadata {
  text?: string;
  title?: string;
  items: Array<Banner>;
}

/**
 * Returns an [[Slot]] object based on the GraphQL [[PageGridPlacement]]
 */
export const initializeSlot = (self: any, rootSegment: string): Slot => {
  const slot: Slot = { items: [] };
  if ("teaserTitle" in self) {
    addProperty(slot, "title", self.teaserTitle, getPropertyName(self, "teaserTitle"));
  }
  if ("plainTeaserText" in self) {
    addProperty(slot, "text", self.plainTeaserText, getPropertyName(self, "plainTeaserText"));
  }
  if ("items" in self) {
    addProperty(
      slot,
      "items",
      self.items
        .filter(notEmpty)
        .map((item: any) => initializeBannerFor(item, rootSegment))
        .filter(notEmpty),
      getPropertyName(self, "items")
    );
  }

  return slot;
};
