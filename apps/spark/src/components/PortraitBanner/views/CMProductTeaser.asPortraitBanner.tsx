import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import PortraitProductBanner from "../PortraitProductBanner";
import { ProductTeaser } from "@coremedia-labs/graphql-layer";
import { initializeProductBannerFromProductTeaser, ProductBanner } from "../../../models/Banner/ProductBanner";

const CMProductTeaserAsPortraitBanner: React.FC<IncludeProps<ProductTeaser>> = ({ self }) => {
  const banner: ProductBanner = initializeProductBannerFromProductTeaser(self);

  return <PortraitProductBanner banner={banner} />;
};

export default CMProductTeaserAsPortraitBanner;
