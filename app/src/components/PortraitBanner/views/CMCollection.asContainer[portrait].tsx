import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { Collection } from "../../../queries/fragments/__generated__/Collection";
import PortraitBannerContainer from "../PortraitBannerContainer";
import { initializeSlotFromCollection } from "../../../models/Grid/Slot";

const CMCollectionAsContainerPortrait: React.FC<IncludeProps<Collection>> = ({ self }) => {
  return <PortraitBannerContainer slot={initializeSlotFromCollection(self)} />;
};

export default CMCollectionAsContainerPortrait;
