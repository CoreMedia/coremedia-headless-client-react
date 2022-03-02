import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { ProductTeaser } from "@coremedia-labs/graphql-layer";
import { initializeProductBannerFromProductTeaser, ProductBanner } from "../../../models/Banner/ProductBanner";
import SquareProductBanner from "../SquareProductBanner";

const CMProductTeaserAsSquareBanner: React.FC<IncludeProps<ProductTeaser>> = ({ self }) => {
  const banner: ProductBanner = initializeProductBannerFromProductTeaser(self);

  return <SquareProductBanner banner={banner} />;
};

export default CMProductTeaserAsSquareBanner;
