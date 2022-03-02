import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { Collection } from "@coremedia-labs/graphql-layer";
import DetailContainer from "../DetailContainer";
import { initializeSlotFromCollection } from "../../../models/Grid/Slot";

const CMCollectionAsContainerDetail: React.FC<IncludeProps<Collection>> = ({ self }) => {
  return <DetailContainer slot={initializeSlotFromCollection(self)} />;
};

export default CMCollectionAsContainerDetail;
