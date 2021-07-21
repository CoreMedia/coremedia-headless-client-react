import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import LeftRightProduct from "../LeftRightProduct";
import { ProductTeaser } from "../../../queries/fragments/__generated__/ProductTeaser";
import { initializeProductBannerFromProductTeaser, ProductBanner } from "../../../models/Banner/ProductBanner";

const ProductTeaserAsLeftRightBanner: React.FC<IncludeProps<ProductTeaser>> = ({ self }) => {
  const banner: ProductBanner = initializeProductBannerFromProductTeaser(self);
  return <LeftRightProduct banner={banner} />;
};

export default ProductTeaserAsLeftRightBanner;
