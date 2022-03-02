import React from "react";
import Include from "../../../utils/ViewDispatcher/Include";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { Collection } from "@coremedia-labs/graphql-layer";

const CMCollectionAsItem: React.FC<IncludeProps<Collection>> = ({ self }) => {
  return <Include self={self} view={"asContainer"} />;
};

export default CMCollectionAsItem;
