import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { PageGridPlacement } from "../../../queries/fragments/__generated__/PageGridPlacement";
import LeftRightBannerContainer from "../LeftRightBannerContainer";
import { initializeSlotFromPageGridPlacement } from "../../../models/Grid/Slot";

const PageGridPlacementAsLeftRight: React.FC<IncludeProps<PageGridPlacement>> = ({ self }) => {
  return <LeftRightBannerContainer slot={initializeSlotFromPageGridPlacement(self)} />;
};

export default PageGridPlacementAsLeftRight;
