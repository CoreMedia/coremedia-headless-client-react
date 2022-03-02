import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { Teasable } from "@coremedia-labs/graphql-layer";
import CarouselBanner from "../CarouselBanner";
import { Banner, initializeBanner } from "../../../models/Banner/Banner";

const CMTeasableAsCarouselBanner: React.FC<IncludeProps<Teasable>> = ({ self }) => {
  const banner: Banner = initializeBanner(self);
  return <CarouselBanner banner={banner} />;
};

export default CMTeasableAsCarouselBanner;
