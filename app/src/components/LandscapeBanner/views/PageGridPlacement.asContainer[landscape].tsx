import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { PageGridPlacement } from "../../../queries/fragments/__generated__/PageGridPlacement";
import LandscapeBannerContainer from "../LandscapeBannerContainer";
import { initializeSlotFromPageGridPlacement } from "../../../models/Grid/Slot";

const PageGridPlacementAsContainerLandscape: React.FC<IncludeProps<PageGridPlacement>> = ({ self }) => {
  return <LandscapeBannerContainer slot={initializeSlotFromPageGridPlacement(self)} />;
};

export default PageGridPlacementAsContainerLandscape;
