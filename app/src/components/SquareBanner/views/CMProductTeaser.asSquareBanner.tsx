import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { ProductTeaser } from "../../../queries/fragments/__generated__/ProductTeaser";
import { useSiteContextState } from "../../../context/SiteContextProvider";
import { initializeProductBannerFromProductTeaser, ProductBanner } from "../../../models/Banner/ProductBanner";
import SquareProductBanner from "../SquareProductBanner";

const CMProductTeaserAsSquareBanner: React.FC<IncludeProps<ProductTeaser>> = ({ self }) => {
  const { rootSegment } = useSiteContextState();
  const banner: ProductBanner = initializeProductBannerFromProductTeaser(self, rootSegment);

  return <SquareProductBanner banner={banner} />;
};

export default CMProductTeaserAsSquareBanner;
