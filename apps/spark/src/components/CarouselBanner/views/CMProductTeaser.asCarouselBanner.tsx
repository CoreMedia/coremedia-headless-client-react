import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import CarouselProductBanner from "../CarouselProductBanner";
import { ProductTeaser } from "@coremedia-labs/graphql-layer";
import { initializeProductBannerFromProductTeaser, ProductBanner } from "../../../models/Banner/ProductBanner";

const CMProductTeaserAsCarouselBanner: React.FC<IncludeProps<ProductTeaser>> = ({ self }) => {
  const banner: ProductBanner = initializeProductBannerFromProductTeaser(self);
  return <CarouselProductBanner banner={banner} />;
};

export default CMProductTeaserAsCarouselBanner;
