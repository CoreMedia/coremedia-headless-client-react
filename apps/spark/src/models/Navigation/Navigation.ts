import PreviewMetadataProps, { getPropertyName } from "../../utils/Preview/MetaData";
import { Dispatchable } from "../../utils/ViewDispatcher/Dispatchable";
import { initializePicture, Picture } from "../Banner/Picture";
import { Category } from "../../queries/fragments/Category";
import { createCategoryHref, createHref } from "../../utils/Link/LinkUtils";
import { Navigation as GraphQLNavigation } from "../../queries/fragments/Navigation";
import { ExternalNavigation } from "../../queries/fragments/ExternalNavigation";
import { Collection } from "../../queries/fragments/__generated__/Collection";
import { CMProduct } from "../../queries/fragments/__generated__/CMProduct";
import { Teasable } from "../../queries/fragments/__generated__/Teasable";
import { addProperty, mapProperties } from "../../utils/ViewDispatcher/ModelHelper";

export interface Navigation extends PreviewMetadataProps {
  title: string | null;
  items?: Array<Dispatchable | null> | null;
  related?: Array<Dispatchable | null>;
  picture?: Picture;
  linkTarget?: string;
}

export const initializeNavigationFromCategory = (self: Category, rootSegment: string): Navigation => {
  const navigation: Navigation = {
    ...mapProperties(self, { title: "name", items: "children" }),
  };
  self.augmentation.picture &&
    addProperty(
      navigation,
      "picture",
      initializePicture(self.augmentation.picture),
      getPropertyName(self.augmentation, "picture")
    );
  const linkTarget = createCategoryHref(self, rootSegment);
  linkTarget && (navigation.linkTarget = linkTarget);
  return navigation;
};

export const initializeNavigationFromNavigation = (self: GraphQLNavigation, rootSegment: string): Navigation => {
  const navigation: Navigation = {
    ...mapProperties(self, { title: "teaserTitle", items: "children" }),
  };
  self.picture && addProperty(navigation, "picture", initializePicture(self.picture), getPropertyName(self, "picture"));
  const linkTarget = createHref(self, rootSegment);
  linkTarget && (navigation.linkTarget = linkTarget);
  return navigation;
};

export const initializeNavigationFromExternalNavigation = (
  self: ExternalNavigation,
  rootSegment: string
): Navigation => {
  const navigation: Navigation = {
    ...mapProperties(self, { title: "teaserTitle" }),
  };
  self.picture && addProperty(navigation, "picture", initializePicture(self.picture), getPropertyName(self, "picture"));
  let items: Array<Dispatchable | null> | null = null;
  if (self.children && self.children.length > 0) {
    items = self.children;
  } else if (self.categoryRef && self.categoryRef.category) {
    const category: Category = self.categoryRef.category as Category;
    if (category.children && category.children.length > 0) {
      items = category.children;
    }
  }
  items && addProperty(navigation, "items", items, getPropertyName(self, "children"));
  const linkTarget = createHref(self, rootSegment);
  linkTarget && (navigation.linkTarget = linkTarget);
  return navigation;
};

export const initializeNavigationFromCollection = (self: Collection): Navigation => {
  const navigation: Navigation = {
    ...mapProperties(self, { title: "teaserTitle", items: "items" }),
  };
  self.picture && addProperty(navigation, "picture", initializePicture(self.picture), getPropertyName(self, "picture"));
  return navigation;
};

export const initializeNavigationFromCMProduct = (self: CMProduct, rootSegment: string): Navigation => {
  const navigation: Navigation = {
    ...mapProperties(self, { title: "productName" }),
  };
  self.picture && addProperty(navigation, "picture", initializePicture(self.picture), getPropertyName(self, "picture"));
  const linkTarget = createHref(self, rootSegment);
  linkTarget && (navigation.linkTarget = linkTarget);
  return navigation;
};

export const initializeNavigationFromTeasable = (self: Teasable, rootSegment: string): Navigation => {
  const navigation: Navigation = {
    ...mapProperties(self, { title: "teaserTitle" }),
  };
  self.picture && addProperty(navigation, "picture", initializePicture(self.picture), getPropertyName(self, "picture"));
  const linkTarget = createHref(self, rootSegment);
  linkTarget && (navigation.linkTarget = linkTarget);
  return navigation;
};
