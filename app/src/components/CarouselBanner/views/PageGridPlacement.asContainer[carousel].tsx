import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import CarouselBannerContainer from "../CarouselBannerContainer";
import { PageGridPlacement } from "../../../queries/fragments/__generated__/PageGridPlacement";
import { initializeSlotFromPageGridPlacement } from "../../../models/Grid/Slot";

const PageGridPlacementAsContainerCarousel: React.FC<IncludeProps<PageGridPlacement>> = ({ self }) => {
  return <CarouselBannerContainer {...initializeSlotFromPageGridPlacement(self)} />;
};

export default PageGridPlacementAsContainerCarousel;
