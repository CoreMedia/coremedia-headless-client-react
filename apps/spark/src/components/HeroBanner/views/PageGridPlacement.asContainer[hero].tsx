import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { PageGridPlacement } from "@coremedia-labs/graphql-layer";
import HeroBannerContainer from "../HeroBannerContainer";
import { initializeSlotFromPageGridPlacement } from "../../../models/Grid/Slot";

const PageGridPlacementAsHero: React.FC<IncludeProps<PageGridPlacement>> = ({ self }) => {
  return <HeroBannerContainer {...initializeSlotFromPageGridPlacement(self)} />;
};

export default PageGridPlacementAsHero;
