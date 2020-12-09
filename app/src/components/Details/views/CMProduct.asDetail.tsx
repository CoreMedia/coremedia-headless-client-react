import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { DetailCMProduct } from "../../../queries/fragments/__generated__/DetailCMProduct";
import DetailedCMProduct from "../DetailedCMProduct";
import { useSiteContextState } from "../../../context/SiteContextProvider";
import { initializeDetailCMProduct } from "../../../models/Detail/DetailCMProduct";

const CMProductAsDetail: React.FC<IncludeProps<DetailCMProduct>> = ({ self }) => {
  const { rootSegment } = useSiteContextState();
  return <DetailedCMProduct {...initializeDetailCMProduct(self, rootSegment)} />;
};
export default CMProductAsDetail;
