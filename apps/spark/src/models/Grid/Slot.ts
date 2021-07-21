import { Dispatchable } from "../../utils/ViewDispatcher/Dispatchable";
import PreviewMetadata from "../../utils/Preview/MetaData";
import { PageGridPlacement } from "../../queries/fragments/__generated__/PageGridPlacement";
import { mapProperties } from "../../utils/ViewDispatcher/ModelHelper";
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
  return {
    ...mapProperties(self, { items: "items", title: "teaserTitle", text: "plainTeaserText" }),
  };
};
