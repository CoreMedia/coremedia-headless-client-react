import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { Product } from "../../../queries/fragments/__generated__/Product";
import { initializeProductBannerFromProduct, ProductBanner } from "../../../models/Banner/ProductBanner";
import LandscapeProductBanner from "../LandscapeProductBanner";

const ProductAsLandscapeBanner: React.FC<IncludeProps<Product>> = ({ self }) => {
  const banner: ProductBanner = initializeProductBannerFromProduct(self);
  return <LandscapeProductBanner banner={banner} />;
};

export default ProductAsLandscapeBanner;
