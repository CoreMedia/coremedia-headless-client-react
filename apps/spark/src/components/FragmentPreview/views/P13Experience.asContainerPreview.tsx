import React from "react";
import {CmTeasable, P13NExperience} from "@coremedia-labs/graphql-layer";
import { useSiteContextState } from "../../../context/SiteContextProvider";
import { initializeBannerFor } from "../../../models/Banner/Banner";
import { Slot } from "../../../models/Grid/Slot";
import { slotByName } from "../../../utils/PageGrid/PageGridUtil";
import { Dispatchable } from "../../../utils/ViewDispatcher/Dispatchable";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { notEmpty } from "../../../utils/Helpers";
import {usePreviewContextState} from "../../../context/PreviewContextProvider";

const getContainer = (items: Array<Dispatchable>, rootSegment: string): Slot => {
  return {
    items: items.map((item) => initializeBannerFor(item, rootSegment)).filter(notEmpty),
  };
};

const P13ExperienceAsContainerPreview: React.FC<IncludeProps<P13NExperience>> = ({ self, params }) => {
  const { rootSegment } = useSiteContextState();
  const Container = slotByName(params?.containerView as string);
  const { previewP13Experiences } = usePreviewContextState();
  const previewP13Variants = previewP13Experiences && previewP13Experiences.variants;
  const p13nVariants = self && self.variants;
  const baseline = self && self.baseline as CmTeasable;
  let p13nTargets = baseline && [baseline];
  if (previewP13Variants && p13nVariants) {
    p13nTargets = p13nVariants
      .filter((p13nVariant) => previewP13Variants.indexOf(p13nVariant.id) >= 0)
      .map((p13nVariant) => p13nVariant.target as CmTeasable);
  }
  return <>{p13nTargets && <Container {...getContainer(p13nTargets, rootSegment)} />}</>;
};
export default P13ExperienceAsContainerPreview;
