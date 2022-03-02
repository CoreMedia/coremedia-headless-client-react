import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { DetailTeasable } from "@coremedia-labs/graphql-layer";
import DetailedTeasable from "../DetailedTeasable";
import { initializeDetail } from "../../../models/Detail/Detail";
import SeoHeader from "../../Header/SeoHeader";

const CMTeasableAsDetail: React.FC<IncludeProps<DetailTeasable>> = ({ self }) => {
  const detail = initializeDetail(self);
  return (
    <>
      <SeoHeader title={detail.title} />
      <DetailedTeasable {...detail} />
    </>
  );
};
export default CMTeasableAsDetail;
