import { Dispatchable } from "../../utils/ViewDispatcher/Dispatchable";
import PreviewMetadata, { getPropertyName } from "../../utils/Preview/MetaData";
import { PageGridPlacement } from "../../queries/fragments/__generated__/PageGridPlacement";
import { addProperty, mapProperties } from "../../utils/ViewDispatcher/ModelHelper";
import { Collection } from "../../queries/fragments/__generated__/Collection";

/**
 * @category ViewModels
 */
export interface Slot extends PreviewMetadata {
  text?: string;
  title?: string;
  items: Array<Dispatchable | null> | null;
}

/**
 * Returns an [[Slot]] object based on the GraphQL [[PageGridPlacement]]
 * @param self
 */
export const initializeSlotFromPageGridPlacement = (self: PageGridPlacement): Slot => {
  return { items: self.items };
};

/**
 * Returns an [[Slot]] object based on the GraphQL [[Collection]]
 * @param self
 */
export const initializeSlotFromCollection = (self: Collection): Slot => {
  const slot: Slot = {
    ...mapProperties(self, { items: "items", title: "teaserTitle" }),
  };
  (self.teaserText?.plaintext ?? self.teaserText?.plaintext !== undefined) &&
    addProperty(slot, "text", self.teaserText?.plaintext, getPropertyName(self, "teaserText"));
  return slot;
};
