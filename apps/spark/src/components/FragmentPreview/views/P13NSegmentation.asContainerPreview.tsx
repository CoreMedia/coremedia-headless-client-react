import React from "react";
import {P13NSegmentation} from "@coremedia-labs/graphql-layer";
import {useSiteContextState} from "../../../context/SiteContextProvider";
import {initializeBannerFor} from "../../../models/Banner/Banner";
import {Slot} from "../../../models/Grid/Slot";
import {slotByName} from "../../../utils/PageGrid/PageGridUtil";
import {Dispatchable} from "../../../utils/ViewDispatcher/Dispatchable";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import {notEmpty} from "../../../utils/Helpers";
import {getP13NTargets} from "../../../models/Banner/P13N";

const getContainer = (items: Array<Dispatchable>, rootSegment: string): Slot => {
  return {
    items: items.map((item) => initializeBannerFor(item, rootSegment)).filter(notEmpty),
  };
};

const P13NSegmentationAsContainerPreview: React.FC<IncludeProps<P13NSegmentation>> = ({ self, params }) => {
  const { rootSegment } = useSiteContextState();
  const Container = slotByName(params?.containerView as string);
  // TODO: segmentation in preview doesn't work (eye use case do though). There must be another url parameter?
  const p13NTargets = self && getP13NTargets(self);
  return <>{p13NTargets && <Container {...getContainer(p13NTargets, rootSegment)} />}</>;
};
export default P13NSegmentationAsContainerPreview;
