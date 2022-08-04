import { CmCollection } from "@coremedia-labs/graphql-layer";
import React from "react";
import { useSiteContextState } from "../../../context/SiteContextProvider";
import { initializeSlot } from "../../../models/Grid/Slot";
import { slotByName } from "../../../utils/PageGrid/PageGridUtil";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";

const CMTeasableAsContainerPreview: React.FC<IncludeProps<CmCollection>> = ({ self, params }) => {
  const { rootSegment } = useSiteContextState();
  const Container = slotByName((params?.containerView as string) || self.viewtype);
  return <Container {...initializeSlot(self, rootSegment)} />;
};
export default CMTeasableAsContainerPreview;
