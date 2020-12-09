import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { PageGridPlacement } from "../../../queries/fragments/__generated__/PageGridPlacement";
import DetailContainer from "../DetailContainer";
import { initializeSlotFromPageGridPlacement } from "../../../models/Grid/Slot";

const PageGridPlacementAsDetail: React.FC<IncludeProps<PageGridPlacement>> = ({ self }) => {
  return <DetailContainer slot={initializeSlotFromPageGridPlacement(self)} />;
};

export default PageGridPlacementAsDetail;
