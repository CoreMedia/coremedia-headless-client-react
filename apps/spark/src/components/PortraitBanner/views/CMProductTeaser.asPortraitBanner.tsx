import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import PortraitProductBanner from "../PortraitProductBanner";
import { ProductTeaser } from "../../../queries/fragments/__generated__/ProductTeaser";
import { initializeProductBannerFromProductTeaser, ProductBanner } from "../../../models/Banner/ProductBanner";

const CMProductTeaserAsPortraitBanner: React.FC<IncludeProps<ProductTeaser>> = ({ self }) => {
  const banner: ProductBanner = initializeProductBannerFromProductTeaser(self);

  return <PortraitProductBanner banner={banner} />;
};

export default CMProductTeaserAsPortraitBanner;
