import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { Collection } from "@coremedia-labs/graphql-layer";
import LeftRightBannerContainer from "../LeftRightBannerContainer";
import { initializeSlotFromCollection } from "../../../models/Grid/Slot";

const CMCollectionAsContainerCarousel: React.FC<IncludeProps<Collection>> = ({ self }) => {
  return <LeftRightBannerContainer slot={initializeSlotFromCollection(self)} />;
};

export default CMCollectionAsContainerCarousel;
