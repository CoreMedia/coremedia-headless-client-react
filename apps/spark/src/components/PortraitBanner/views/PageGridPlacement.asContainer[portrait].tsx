import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { PageGridPlacement } from "../../../queries/fragments/__generated__/PageGridPlacement";
import PortraitBannerContainer from "../PortraitBannerContainer";
import { initializeSlotFromPageGridPlacement } from "../../../models/Grid/Slot";

const PageGridPlacementAsContainerPortrait: React.FC<IncludeProps<PageGridPlacement>> = ({ self }) => {
  return <PortraitBannerContainer slot={initializeSlotFromPageGridPlacement(self)} />;
};

export default PageGridPlacementAsContainerPortrait;
