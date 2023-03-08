import { Category, CmNavigationFragment } from "@coremedia-labs/graphql-layer";
import { LinkAttributes } from "../../components/Link/Link";
import { getLink } from "../../utils/Link/LinkUtils";
import { PreviewMetadata, getPropertyName } from "../../utils/Preview/MetaData";
import { addProperty, mapProperties } from "../../utils/ViewDispatcher/ModelHelper";
import { addPicture, initializePicture, SupportsPicture } from "../Banner/Picture";
import { SupportsStaticCode } from "../Banner/Code";
import { addCMProductTitle } from "../Banner/CMProduct";

/**
 * @category ViewModels
 */
export interface Navigation extends PreviewMetadata, LinkAttributes, SupportsPicture, SupportsStaticCode {
  items?: Array<Navigation>;
  title: string | null;
  uuid?: string;
}

export interface NavigationProps extends Navigation {
  depth?: number;
  isTopLevel?: boolean;
  maxDepth?: number;
}

export const initializeNavigation = (self: CmNavigationFragment, rootSegment: string): Navigation => {
  const navigation: Navigation = {
    ...mapProperties(self, { title: "teaserTitle", uuid: "uuid" }),
    ...getLink(self, rootSegment),
  };
  addPicture(self, navigation);
  addChildrenAsItems(self, navigation, rootSegment);
  addItemsAsItems(self, navigation, rootSegment);
  addCMProductTitle(self, navigation);
  addCommerceTitle(self, navigation);
  addAugmentationPicture(self, navigation);
  return navigation;
};

/**
 * A collection is a navigation item. Map collection.items to navigation.items
 * @param self
 * @param result
 * @param rootSegment
 */
const addItemsAsItems = (self: any, result: Navigation, rootSegment: string): void => {
  if (self.items) {
    addProperty(
      result,
      "items",
      self.items.map((child: any) => {
        return initializeNavigation(child, rootSegment);
      }),
      getPropertyName(self, "items")
    );
  }
};

/**
 * A cmchannel is a navigation item. Map channel.children to navigation.items
 * @param self
 * @param result
 * @param rootSegment
 */
const addChildrenAsItems = (self: any, result: Navigation, rootSegment: string): void => {
  if (self.children && self.children.length > 0) {
    addProperty(
      result,
      "items",
      self.children.map((child: any) => {
        return initializeNavigation(child, rootSegment);
      }),
      getPropertyName(self, "children")
    );
  } else if (self.categoryRef?.category) {
    const category: Category = self.categoryRef.category as Category;
    if (category.children && category.children.length > 0) {
      addProperty(
        result,
        "items",
        category.children.map((child: any) => {
          return initializeNavigation(child, rootSegment);
        }),
        getPropertyName(self, "children")
      );
    }
  }
};

const addCommerceTitle = (self: any, result: Navigation): void => {
  if (self.name) {
    addProperty(result, "title", self.name, getPropertyName(self, "name"));
  } else if (self.product?.name) {
    addProperty(result, "title", self.product.name, getPropertyName(self.product, "name"));
  }
};

const addAugmentationPicture = (self: any, result: Navigation): void => {
  if (!result.picture && self.augmentation?.picture) {
    addProperty(
      result,
      "picture",
      initializePicture(self.augmentation.picture),
      getPropertyName(self.augmentation, "picture")
    );
  }
};
