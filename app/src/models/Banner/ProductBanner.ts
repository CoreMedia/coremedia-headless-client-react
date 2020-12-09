import { Banner, initializeBanner } from "./Banner";
import { Product as GraphQLProduct } from "../../queries/fragments/__generated__/Product";
import { initializePicture, Picture } from "./Picture";
import { getPropertyName } from "../../utils/Preview/MetaData";
import { addProperty, mapProperties } from "../../utils/ViewDispatcher/ModelHelper";
import { ProductTeaser } from "../../queries/fragments/__generated__/ProductTeaser";
import { isShopNowEnabled } from "../../utils/Commerce/Shopping";
import { createProductHref } from "../../utils/Link/LinkUtils";
import { CatalogPicture } from "./CatalogPicture";

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
 * Returns a [[Picture]] object based on the GraphQL [[CatalogPicture]]
 * Used by [[initializeProductBanner]]
 * @internal
 * @param catalogPicture
 */
const initializePictureFromProductCatalogPicture = (catalogPicture: CatalogPicture): Picture => {
  return {
    uriTemplate: catalogPicture.url,
    title: "",
    alt: "",
    data: null,
  };
};

/**
 * Returns an [[ProductBanner]] object based on the GraphQL [[Product]]
 * Used by [[initializeProductBannerFromProductTeaser]] and [[initializeProductBannerFromProduct]]
 * @internal
 * @param product
 */
const initializeProductBanner = (product: GraphQLProduct): ProductBanner => {
  const productBanner: ProductBanner = {
    ...mapProperties(product, {
      offerPrice: "offerPrice",
      listPrice: "listPrice",
      currency: "currency",
      locale: "locale",
    }),
  };
  product.picture &&
    addProperty(productBanner, "picture", initializePicture(product.picture), getPropertyName(product, "picture"));

  // try to use commerce catalog picture if no other picture is defined.
  product.catalogPicture &&
    !product.picture &&
    addProperty(
      productBanner,
      "picture",
      initializePictureFromProductCatalogPicture(product.catalogPicture),
      getPropertyName(product, "picture")
    );

  return productBanner;
};

/**
 * Returns an [[ProductBanner]] object based on the GraphQL [[ProductTeaser]]
 * @param productTeaser
 * @param rootSegment Needed for link building
 */
export const initializeProductBannerFromProductTeaser = (
  productTeaser: ProductTeaser,
  rootSegment: string
): ProductBanner => {
  let productBanner: ProductBanner = {
    ...initializeBanner(productTeaser, rootSegment),
    shopNowConfiguration: isShopNowEnabled(productTeaser),
  };
  if (productTeaser.product) {
    //first the product, override second
    productBanner = { ...initializeProductBanner(productTeaser.product), ...productBanner };
  }
  return productBanner;
};

/**
 * Returns an [[ProductBanner]] object based on the GraphQL [[Product]]
 * @param product
 * @param rootSegment Needed for link building
 */
export const initializeProductBannerFromProduct = (product: GraphQLProduct, rootSegment: string): ProductBanner => {
  let productBanner: ProductBanner = {
    ...initializeProductBanner(product),
    overlayRequired: false,
    shopNowConfiguration: false,
  };
  product.picture &&
    addProperty(productBanner, "picture", initializePicture(product.picture), getPropertyName(product, "picture"));
  productBanner = mapProperties(
    product,
    { title: "name", plaintext: "shortDescription", text: "shortDescription" },
    productBanner
  );

  const linkTarget = createProductHref(product, rootSegment);
  linkTarget && (productBanner.linkTarget = linkTarget);

  return productBanner;
};
