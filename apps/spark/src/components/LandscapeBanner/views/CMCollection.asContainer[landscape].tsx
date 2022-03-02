import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { Collection } from "@coremedia-labs/graphql-layer";
import LandscapeBannerContainer from "../LandscapeBannerContainer";
import { initializeSlotFromCollection } from "../../../models/Grid/Slot";

const CMCollectionAsContainerLandscape: React.FC<IncludeProps<Collection>> = ({ self }) => {
  return <LandscapeBannerContainer slot={initializeSlotFromCollection(self)} />;
};

export default CMCollectionAsContainerLandscape;
