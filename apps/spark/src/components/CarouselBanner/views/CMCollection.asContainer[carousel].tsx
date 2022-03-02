import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { Collection } from "@coremedia-labs/graphql-layer";
import CarouselBannerContainer from "../CarouselBannerContainer";
import { initializeSlotFromCollection } from "../../../models/Grid/Slot";

const CMCollectionAsContainerCarousel: React.FC<IncludeProps<Collection>> = ({ self }) => {
  return <CarouselBannerContainer {...initializeSlotFromCollection(self)} />;
};

export default CMCollectionAsContainerCarousel;
