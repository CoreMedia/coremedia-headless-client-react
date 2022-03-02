import { Banner, initializeBanner } from "./Banner";
import { Product as GraphQLProduct } from "@coremedia-labs/graphql-layer";
import { initializePicture } from "./Picture";
import { getPropertyName } from "../../utils/Preview/MetaData";
import { addProperty, mapProperties } from "../../utils/ViewDispatcher/ModelHelper";
import { ProductTeaser } from "@coremedia-labs/graphql-layer";
import { isShopNowEnabled } from "../../utils/Commerce/Shopping";
import { ExternalProduct } from "@coremedia-labs/graphql-layer";
import { getLink } from "../../utils/Link/LinkUtils";

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
 */
export const initializeProductBannerFromProductTeaser = (productTeaser: ProductTeaser): ProductBanner => {
  const productBanner: ProductBanner = {
    ...initializeBanner(productTeaser),
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

/**
 * Returns an [[ProductBanner]] object based on the GraphQL [[ExternalProduct]]
 * @param productTeaser
 */
export const initializeProductBannerFromExternalProduct = (productTeaser: ExternalProduct): ProductBanner => {
  const productBanner: ProductBanner = {
    ...initializeBanner(productTeaser),
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
      //2. try external product default catalog picture
      !productBanner.picture &&
        product.thumbnailUrl &&
        addProperty(
          productBanner,
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
  return productBanner;
};

export const initializeProductBannerFromProduct = (product: GraphQLProduct): ProductBanner => {
  let productBanner: ProductBanner = {
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
    overlayRequired: false,
    shopNowConfiguration: false,
    ...getLink(product),
  };
  productBanner = mapProperties(
    product,
    { title: "name", plaintext: "shortDescription", text: "shortDescription" },
    productBanner
  );
  product.thumbnailUrl &&
    addProperty(productBanner, "picture", {
      uriTemplate: product.thumbnailUrl,
    });
  product.augmentation.picture &&
    addProperty(productBanner, "picture", initializePicture(product.augmentation.picture));
  return productBanner;
};
