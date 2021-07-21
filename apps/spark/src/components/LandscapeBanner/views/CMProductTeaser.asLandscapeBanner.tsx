import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import LandscapeProductBanner from "../LandscapeProductBanner";
import { ProductTeaser } from "../../../queries/fragments/__generated__/ProductTeaser";
import { initializeProductBannerFromProductTeaser, ProductBanner } from "../../../models/Banner/ProductBanner";

const ProductTeaserAsLandscapeBanner: React.FC<IncludeProps<ProductTeaser>> = ({ self }) => {
  const banner: ProductBanner = initializeProductBannerFromProductTeaser(self);
  return <LandscapeProductBanner banner={banner} />;
};

export default ProductTeaserAsLandscapeBanner;
