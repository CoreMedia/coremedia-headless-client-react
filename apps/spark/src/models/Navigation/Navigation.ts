import PreviewMetadata, { getPropertyName } from "../../utils/Preview/MetaData";
import { Dispatchable } from "../../utils/ViewDispatcher/Dispatchable";
import { initializePicture, Picture } from "../Banner/Picture";
import { Category } from "../../queries/fragments/Category";
import { createCategoryHref, createHref, createProductHref } from "../../utils/Link/LinkUtils";
import { NavigationForNavigation } from "../../queries/fragments/Navigation";
import { ExternalNavigationForNavigation } from "../../queries/fragments/ExternalNavigation";
import { addProperty, mapProperties } from "../../utils/ViewDispatcher/ModelHelper";
import { Product } from "../../queries/fragments/__generated__/Product";
import { TeasableForNavigation } from "../../queries/fragments/navigation/__generated__/TeasableForNavigation";
import { CMProductForNavigation } from "../../queries/fragments/navigation/__generated__/CMProductForNavigation";
import { CollectionForNavigation } from "../../queries/fragments/navigation/__generated__/CollectionForNavigation";

export interface Navigation extends PreviewMetadata {
  title: string | null;
  items?: Array<Dispatchable | null> | null;
  related?: Array<Dispatchable | null>;
  picture?: Picture;
  linkTarget?: string;
}

export const initializeNavigationFromCategory = (self: Category): Navigation => {
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
  const linkTarget = createCategoryHref(self);
  linkTarget && (navigation.linkTarget = linkTarget);
  return navigation;
};

export const initializeNavigationFromNavigation = (self: NavigationForNavigation): Navigation => {
  const navigation: Navigation = {
    ...mapProperties(self, { title: "teaserTitle", items: "children" }),
  };
  self.picture && addProperty(navigation, "picture", initializePicture(self.picture), getPropertyName(self, "picture"));
  const linkTarget = createHref(self);
  linkTarget && (navigation.linkTarget = linkTarget);
  return navigation;
};

export const initializeNavigationFromExternalNavigation = (self: ExternalNavigationForNavigation): Navigation => {
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
  const linkTarget = createHref(self);
  linkTarget && (navigation.linkTarget = linkTarget);
  return navigation;
};

export const initializeNavigationFromCollection = (self: CollectionForNavigation): Navigation => {
  const navigation: Navigation = {
    ...mapProperties(self, { title: "teaserTitle", items: "items" }),
  };
  self.picture && addProperty(navigation, "picture", initializePicture(self.picture), getPropertyName(self, "picture"));
  return navigation;
};

export const initializeNavigationFromCMProduct = (self: CMProductForNavigation): Navigation => {
  const navigation: Navigation = {
    ...mapProperties(self, { title: "productName" }),
  };
  self.picture && addProperty(navigation, "picture", initializePicture(self.picture), getPropertyName(self, "picture"));
  const linkTarget = createHref(self);
  linkTarget && (navigation.linkTarget = linkTarget);
  return navigation;
};

export const initializeNavigationFromProduct = (self: Product): Navigation => {
  const navigation: Navigation = {
    title: self.name || null,
  };
  const linkTarget = createProductHref(self);
  linkTarget && (navigation.linkTarget = linkTarget);
  return navigation;
};

export const initializeNavigationFromTeasable = (self: TeasableForNavigation): Navigation => {
  const navigation: Navigation = {
    ...mapProperties(self, { title: "teaserTitle" }),
  };
  self.picture && addProperty(navigation, "picture", initializePicture(self.picture), getPropertyName(self, "picture"));
  const linkTarget = createHref(self);
  linkTarget && (navigation.linkTarget = linkTarget);
  return navigation;
};
