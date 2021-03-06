import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { Collection } from "../../../queries/fragments/__generated__/Collection";
import HeroBannerContainer from "../HeroBannerContainer";
import { initializeSlotFromCollection } from "../../../models/Grid/Slot";

const CMCollectionAsContainerHero: React.FC<IncludeProps<Collection>> = ({ self }) => {
  return <HeroBannerContainer {...initializeSlotFromCollection(self)} />;
};

export default CMCollectionAsContainerHero;
