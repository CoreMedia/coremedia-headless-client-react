import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { Teasable } from "@coremedia-labs/graphql-layer";
import Include from "../../../utils/ViewDispatcher/Include";
import { Dispatchable } from "../../../utils/ViewDispatcher/Dispatchable";
import { PageGridPlacement, PageGridPlacement_items } from "@coremedia-labs/graphql-layer";

const getContainer = (items: Array<Dispatchable>): PageGridPlacement => {
  return {
    __typename: "PageGridPlacementImpl",
    items: items as PageGridPlacement_items[],
    name: "custom",
    viewtype: null,
    id: "unique",
  };
};

const CMTeasableAsContainerPreview: React.FC<IncludeProps<Teasable>> = ({ self, params }) => {
  return (
    <Include self={getContainer([self])} view={(params?.containerView as string) || ""} params={{ infinite: false }} />
  );
};
export default CMTeasableAsContainerPreview;
