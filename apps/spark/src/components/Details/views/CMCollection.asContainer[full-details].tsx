import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { Collection } from "../../../queries/fragments/__generated__/Collection";
import DetailContainer from "../DetailContainer";
import { initializeSlotFromCollection } from "../../../models/Grid/Slot";

const CMCollectionAsContainerDetail: React.FC<IncludeProps<Collection>> = ({ self }) => {
  return <DetailContainer slot={initializeSlotFromCollection(self)} />;
};

export default CMCollectionAsContainerDetail;
