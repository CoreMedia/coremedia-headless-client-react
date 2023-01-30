import React from "react";
import {P13NExperience} from "@coremedia-labs/graphql-layer";
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

const P13ExperienceAsContainerPreview: React.FC<IncludeProps<P13NExperience>> = ({ self, params }) => {
  const { rootSegment } = useSiteContextState();
  const Container = slotByName(params?.containerView as string);
  const p13nVariant = self && self.variants && self.variants.at(0);
  const p13nTarget = p13nVariant && p13nVariant.target;
  return <>{p13nTarget && <Container {...getContainer([p13nTarget], rootSegment)} />}</>;
};
export default P13ExperienceAsContainerPreview;
