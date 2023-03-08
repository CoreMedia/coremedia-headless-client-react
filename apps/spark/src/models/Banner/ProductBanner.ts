import { ProductImpl } from "@coremedia-labs/graphql-layer";
import { getLink } from "../../utils/Link/LinkUtils";
import { getPropertyName, PreviewMetadata } from "../../utils/Preview/MetaData";
import { addProperty, mapProperties } from "../../utils/ViewDispatcher/ModelHelper";
import { Banner } from "./Banner";
import { initializePicture } from "./Picture";

/**
 * @category ViewModels
 */

export interface SupportsShopNow extends PreviewMetadata {
  shopNowConfiguration: boolean;
}

export interface SupportsPricing extends PreviewMetadata {
  offerPrice?: any | null;
  listPrice?: any | null;
  currency?: string | null;
  locale?: string | null;
}

export const initializeProductBannerFromProduct = (product: ProductImpl, rootSegment: string): Banner => {
  let productBanner: Banner = {
    ...mapProperties(
      product,
      {
        offerPrice: "offerPrice",
        listPrice: "listPrice",
        currency: "currency",
        locale: "locale",
      },
      {},
      "commerce"
    ),
    ...getLink(product, rootSegment),
    overlayRequired: false,
  };
  addShopNow(product, productBanner);
  productBanner = mapProperties(
    product,
    { title: "name", plaintext: "shortDescription", text: "shortDescription" },
    productBanner
  );
  product.thumbnailUrl &&
    addProperty(
      productBanner,
      "picture",
      {
        uriTemplate: product.thumbnailUrl,
      },
      "properties.pictures[0]"
    );
  product.augmentation?.picture &&
    addProperty(productBanner, "picture", initializePicture(product.augmentation.picture), "properties.pictures[0]");
  return productBanner;
};

export const supportsPricing = (object: any): object is SupportsPricing => {
  return "offerPrice" in object || "listPrice" in object;
};

export const supportsShopNow = (object: any): object is SupportsShopNow => {
  return "shopNowConfiguration" in object;
};

export const addShopNow = (self: any, result: SupportsShopNow): void => {
  result.shopNowConfiguration = false;
  if (self.shopNowSetting) {
    result.shopNowConfiguration = true;
    const showNowSetting: { shopNow: string } = self.shopNowSetting;
    showNowSetting &&
      showNowSetting.shopNow &&
      showNowSetting.shopNow === "disabled" &&
      (result.shopNowConfiguration = false);
  }
};

export const addPricing = (self: any, result: SupportsPricing): void => {
  if (self.productRef?.product) {
    const product = self.productRef.product;
    addProperty(result, "offerPrice", product.offerPrice);
    addProperty(result, "listPrice", product.listPrice);
    addProperty(result, "currency", product.currency);
    addProperty(result, "locale", product.locale);
  }
};

export const addProductOverrides = (self: any, result: Banner): void => {
  if (self.productRef?.product) {
    const product = self.productRef.product;
    // add product properties, if not augmented
    !result.title && addProperty(result, "title", product.name);
    !result.text && addProperty(result, "text", product.shortDescription);
    !result.plaintext && addProperty(result, "plaintext", product.shortDescription);

    // try to add product picture, if missing
    if (!result.picture) {
      //1. try augmentation picture
      addAugmentationPicture(product, result);
      //2. try external product default catalog picture
      !result.picture &&
        product.thumbnailUrl &&
        addProperty(
          result,
          "picture",
          {
            title: "title",
            alt: "alt",
            uriTemplate: product.thumbnailUrl,
            data: "data",
          },
          "picture"
        );
    }
  }
};

export const addAugmentationPicture = (self: any, result: any): void => {
  if (!result.picture && self.augmentation?.picture) {
    addProperty(
      result,
      "picture",
      initializePicture(self.augmentation.picture),
      getPropertyName(self.augmentation, "picture")
    );
  }
};
