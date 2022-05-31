import { PageGridPlacement } from "@coremedia-labs/graphql-layer";
import { getLink } from "../../utils/Link/LinkUtils";
import { placementByName } from "../../utils/PageGrid/PageGridUtil";
import { addProperty, mapProperties } from "../../utils/ViewDispatcher/ModelHelper";
import { flattenItems } from "../../utils/Helpers";
import { Navigation } from "../Navigation/Navigation";
import { getPropertyName, initializeMetadata } from "../../utils/Preview/MetaData";

export const initializeFooter = (self: any, rootSegment: string): Navigation => {
  return {
    ...mapProperties(self, { title: "teaserTitle", code: "html" }),
    ...getLink(self, rootSegment),
  };
};

export const initializeFooterNavigationContainer = (
  placements: Array<PageGridPlacement | null>,
  rootSegment: string
): Navigation | undefined => {
  const footerNavigation = placementByName(placements, "footer-navigation");
  if (footerNavigation) {
    return {
      title: null,
      code: null,
      items: footerNavigation.items.map((column) => {
        return initializeFooterCollection(column, rootSegment);
      }),
      ...initializeMetadata("footer-navigation"),
    };
  }
  return undefined;
};

export const initializeFooterContainer = (
  placements: Array<PageGridPlacement | null>,
  rootSegment: string
): Navigation | undefined => {
  const footer = placementByName(placements, "footer");
  if (footer) {
    return {
      title: null,
      code: null,
      items: flattenItems(footer.items).map((column) => {
        return initializeFooter(column, rootSegment);
      }),
      ...initializeMetadata("footer"),
    };
  }
  return undefined;
};

export const initializeFooterCollection = (self: any, rootSegment: string): Navigation => {
  const footerCollection: Navigation = {
    ...mapProperties(self, { title: "teaserTitle", code: "html" }),
    ...getLink(self, rootSegment),
  };
  if ("items" in self) {
    addProperty(
      footerCollection,
      "items",
      self.items.map((item: any) => {
        return initializeFooter(item, rootSegment);
      }),
      getPropertyName(self, "items")
    );
  } else if ("children" in self) {
    addProperty(
      footerCollection,
      "items",
      self.children.map((item: any) => {
        return initializeFooter(item, rootSegment);
      }),
      getPropertyName(self, "children")
    );
  }

  return footerCollection;
};
