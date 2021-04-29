import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import LeftRightProduct from "../LeftRightProduct";
import { ProductTeaser } from "../../../queries/fragments/__generated__/ProductTeaser";
import { useSiteContextState } from "../../../context/SiteContextProvider";
import { initializeProductBannerFromProductTeaser, ProductBanner } from "../../../models/Banner/ProductBanner";

const ProductTeaserAsLeftRightBanner: React.FC<IncludeProps<ProductTeaser>> = ({ self }) => {
  const { rootSegment } = useSiteContextState();
  const banner: ProductBanner = initializeProductBannerFromProductTeaser(self, rootSegment);
  return <LeftRightProduct banner={banner} />;
};

export default ProductTeaserAsLeftRightBanner;
