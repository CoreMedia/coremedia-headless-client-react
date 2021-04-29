import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { Collection } from "../../../queries/fragments/__generated__/Collection";
import LeftRightBannerContainer from "../LeftRightBannerContainer";
import { initializeSlotFromCollection } from "../../../models/Grid/Slot";

const CMCollectionAsContainerCarousel: React.FC<IncludeProps<Collection>> = ({ self }) => {
  return <LeftRightBannerContainer slot={initializeSlotFromCollection(self)} />;
};

export default CMCollectionAsContainerCarousel;
