import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { Collection } from "../../../queries/fragments/__generated__/Collection";
import SquareBannerContainer from "../SquareBannerContainer";
import { initializeSlotFromCollection } from "../../../models/Grid/Slot";

const CMCollectionAsContainerSquare: React.FC<IncludeProps<Collection>> = ({ self }) => {
  return <SquareBannerContainer slot={initializeSlotFromCollection(self)} />;
};

export default CMCollectionAsContainerSquare;
