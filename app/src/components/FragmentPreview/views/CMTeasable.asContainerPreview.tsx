import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { Teasable } from "../../../queries/fragments/__generated__/Teasable";
import Include from "../../../utils/ViewDispatcher/Include";
import { Dispatchable } from "../../../utils/ViewDispatcher/Dispatchable";
import { PageGridPlacement, PageGridPlacement_items } from "../../../queries/fragments/__generated__/PageGridPlacement";

const getContainer = (items: Array<Dispatchable>): PageGridPlacement => {
  return {
    __typename: "PageGridPlacement",
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
