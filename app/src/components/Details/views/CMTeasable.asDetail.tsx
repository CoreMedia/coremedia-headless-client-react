import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { DetailTeasable } from "../../../queries/fragments/__generated__/DetailTeasable";
import DetailedTeasable from "../DetailedTeasable";
import { useSiteContextState } from "../../../context/SiteContextProvider";
import { initializeDetail } from "../../../models/Detail/Detail";

const CMTeasableAsDetail: React.FC<IncludeProps<DetailTeasable>> = ({ self }) => {
  const { rootSegment } = useSiteContextState();
  return <DetailedTeasable {...initializeDetail(self, rootSegment)} />;
};
export default CMTeasableAsDetail;
