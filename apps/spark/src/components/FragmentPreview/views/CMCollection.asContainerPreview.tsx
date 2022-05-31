import { Collection } from "@coremedia-labs/graphql-layer";
import React from "react";
import { useSiteContextState } from "../../../context/SiteContextProvider";
import { initializeBannerFor } from "../../../models/Banner/Banner";
import { Slot } from "../../../models/Grid/Slot";
import { slotByName } from "../../../utils/PageGrid/PageGridUtil";
import { Dispatchable } from "../../../utils/ViewDispatcher/Dispatchable";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { notEmpty } from "../../../utils/Helpers";

const getContainer = (items: Array<Dispatchable>, rootSegment: string): Slot => {
  return {
    items: items.map((item) => initializeBannerFor(item, rootSegment)).filter(notEmpty),
  };
};

const CMTeasableAsContainerPreview: React.FC<IncludeProps<Collection>> = ({ self, params }) => {
  const { rootSegment } = useSiteContextState();
  const Container = slotByName(params?.containerView as string);
  return <Container {...getContainer((self.items && self.items.filter(notEmpty)) || [], rootSegment)} />;
};
export default CMTeasableAsContainerPreview;
