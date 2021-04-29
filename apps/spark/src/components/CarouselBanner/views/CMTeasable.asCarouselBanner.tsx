import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { Teasable } from "../../../queries/fragments/__generated__/Teasable";
import CarouselBanner from "../CarouselBanner";
import { Banner, initializeBanner } from "../../../models/Banner/Banner";
import { useSiteContextState } from "../../../context/SiteContextProvider";

const CMTeasableAsCarouselBanner: React.FC<IncludeProps<Teasable>> = ({ self }) => {
  const { rootSegment } = useSiteContextState();
  const banner: Banner = initializeBanner(self, rootSegment);
  return <CarouselBanner banner={banner} />;
};

export default CMTeasableAsCarouselBanner;
