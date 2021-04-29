import { Banner, initializeBanner } from "./Banner";
import { initializePicture } from "./Picture";
import { getPropertyName } from "../../utils/Preview/MetaData";
import { addProperty } from "../../utils/ViewDispatcher/ModelHelper";
import { ProductTeaser } from "../../queries/fragments/__generated__/ProductTeaser";
import { isShopNowEnabled } from "../../utils/Commerce/Shopping";

/**
 * @category ViewModels
 */
export interface ProductBanner extends Banner {
  shopNowConfiguration: boolean;
  offerPrice?: any | null;
  listPrice?: any | null;
  currency?: string | null;
  locale?: string | null;
}

/**
 * Returns an [[ProductBanner]] object based on the GraphQL [[ProductTeaser]]
 * @param productTeaser
 * @param rootSegment Needed for link building
 */
export const initializeProductBannerFromProductTeaser = (
  productTeaser: ProductTeaser,
  rootSegment: string
): ProductBanner => {
  const productBanner: ProductBanner = {
    ...initializeBanner(productTeaser, rootSegment),
    shopNowConfiguration: isShopNowEnabled(productTeaser),
  };

  if (productTeaser.productRef && productTeaser.productRef.product) {
    const product = productTeaser.productRef.product;

    // add additional properties
    addProperty(productBanner, "offerPrice", product.offerPrice);
    addProperty(productBanner, "listPrice", product.listPrice);
    addProperty(productBanner, "currency", product.currency);
    addProperty(productBanner, "locale", product.locale);

    // add product properties, if not augmented
    !productBanner.title && addProperty(productBanner, "title", product.name);
    !productBanner.text && addProperty(productBanner, "text", product.shortDescription);
    !productBanner.plaintext && addProperty(productBanner, "plaintext", product.shortDescription);

    // try to add product picture, if missing
    if (!productBanner.picture) {
      //1. try augmentation picture
      product.augmentation &&
        product.augmentation.picture &&
        addProperty(
          productBanner,
          "picture",
          initializePicture(product.augmentation.picture),
          getPropertyName(product.augmentation, "picture")
        );
    }
  }
  return productBanner;
};
