import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { Product } from "@coremedia-labs/graphql-layer";
import { initializeProductBannerFromProduct, ProductBanner } from "../../../models/Banner/ProductBanner";
import LandscapeProductBanner from "../LandscapeProductBanner";

const ProductAsLandscapeBanner: React.FC<IncludeProps<Product>> = ({ self }) => {
  const banner: ProductBanner = initializeProductBannerFromProduct(self);
  return <LandscapeProductBanner banner={banner} />;
};

export default ProductAsLandscapeBanner;
