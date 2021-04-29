import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import PortraitProductBanner from "../PortraitProductBanner";
import { ProductTeaser } from "../../../queries/fragments/__generated__/ProductTeaser";
import { useSiteContextState } from "../../../context/SiteContextProvider";
import { initializeProductBannerFromProductTeaser, ProductBanner } from "../../../models/Banner/ProductBanner";

const CMProductTeaserAsPortraitBanner: React.FC<IncludeProps<ProductTeaser>> = ({ self }) => {
  const { rootSegment } = useSiteContextState();
  const banner: ProductBanner = initializeProductBannerFromProductTeaser(self, rootSegment);

  return <PortraitProductBanner banner={banner} />;
};

export default CMProductTeaserAsPortraitBanner;
