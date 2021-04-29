import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import CarouselProductBanner from "../CarouselProductBanner";
import { ProductTeaser } from "../../../queries/fragments/__generated__/ProductTeaser";
import { useSiteContextState } from "../../../context/SiteContextProvider";
import { initializeProductBannerFromProductTeaser, ProductBanner } from "../../../models/Banner/ProductBanner";

const CMProductTeaserAsCarouselBanner: React.FC<IncludeProps<ProductTeaser>> = ({ self }) => {
  const { rootSegment } = useSiteContextState();
  const banner: ProductBanner = initializeProductBannerFromProductTeaser(self, rootSegment);
  return <CarouselProductBanner banner={banner} />;
};

export default CMProductTeaserAsCarouselBanner;
