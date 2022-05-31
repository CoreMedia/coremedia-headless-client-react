import { CategoryRef, Category } from "@coremedia-labs/graphql-layer";
import { LinkAttributes } from "../../components/Link/Link";
import { getLink } from "../../utils/Link/LinkUtils";
import { PreviewMetadata, getPropertyName } from "../../utils/Preview/MetaData";
import { addProperty, mapProperties } from "../../utils/ViewDispatcher/ModelHelper";
import { addPicture, initializePicture, SupportsPicture } from "../Banner/Picture";
import { SupportsStaticCode } from "../Banner/Code";

export interface Navigation extends PreviewMetadata, LinkAttributes, SupportsPicture, SupportsStaticCode {
  items?: Array<Navigation>;
  title: string | null;
}

export interface NavigationProps extends Navigation {
  depth?: number;
  isTopLevel?: boolean;
  maxDepth?: number;
}

export const initializeNavigation = (self: any, rootSegment: string): Navigation => {
  const navigation: Navigation = {
    ...mapProperties(self, { title: "teaserTitle" }),
    ...getLink(self, rootSegment),
  };
  addPicture(self, navigation);
  addChildrenAsItems(self, navigation, rootSegment);
  addItemsAsItems(self, navigation, rootSegment);
  addCMProductOverrides(self, navigation);
  addCommerceTitle(self, navigation);
  addAugmentationPicture(self, navigation);
  return navigation;
};

//A collection is a navigation item. Map collection.items to navigation.items
export const addItemsAsItems = (self: any, result: Navigation, rootSegment: string): void => {
  if ("items" in self) {
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

//A cmchannel is a navigation item. Map channel.children to navigation.items
export const addChildrenAsItems = (self: any, result: Navigation, rootSegment: string): void => {
  if ("children" in self && self.children.length > 0) {
    addProperty(
      result,
      "items",
      self.children.map((child: any) => {
        return initializeNavigation(child, rootSegment);
      }),
      getPropertyName(self, "children")
    );
  } else if ("categoryRef" in self && self.categoryRef.category) {
    const categoryRef: CategoryRef = self.categoryRef;
    if (categoryRef.category) {
      const category: Category = categoryRef.category as Category;
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
  }
};

export const addCMProductOverrides = (self: any, result: any): void => {
  if ("productName" in self) {
    addProperty(result, "title", self.productName);
  }
};

export const addCommerceTitle = (self: any, result: Navigation): void => {
  if ("name" in self) {
    addProperty(result, "title", self.name, getPropertyName(self, "name"));
  } else if ("product" in self && "name" in self.product) {
    addProperty(result, "title", self.product.name, getPropertyName(self.product, "name"));
  }
};

export const addAugmentationPicture = (self: any, result: Navigation): void => {
  // try to add product picture, if missing
  if (!result.picture && "augmentation" in self) {
    self.augmentation.picture &&
      addProperty(
        result,
        "picture",
        initializePicture(self.augmentation.picture),
        getPropertyName(self.augmentation, "picture")
      );
  }
};
