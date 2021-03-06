import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import LandscapeProductBanner from "../LandscapeProductBanner";
import { ProductTeaser } from "../../../queries/fragments/__generated__/ProductTeaser";
import { useSiteContextState } from "../../../context/SiteContextProvider";
import { initializeProductBannerFromProductTeaser, ProductBanner } from "../../../models/Banner/ProductBanner";

const ProductTeaserAsLandscapeBanner: React.FC<IncludeProps<ProductTeaser>> = ({ self }) => {
  const { rootSegment } = useSiteContextState();
  const banner: ProductBanner = initializeProductBannerFromProductTeaser(self, rootSegment);
  return <LandscapeProductBanner banner={banner} />;
};

export default ProductTeaserAsLandscapeBanner;
