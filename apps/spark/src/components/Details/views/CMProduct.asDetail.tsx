import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { DetailCMProduct } from "@coremedia-labs/graphql-layer";
import DetailedCMProduct from "../DetailedCMProduct";
import { initializeDetailCMProduct } from "../../../models/Detail/DetailCMProduct";
import SeoHeader from "../../Header/SeoHeader";

const CMProductAsDetail: React.FC<IncludeProps<DetailCMProduct>> = ({ self }) => {
  const product = initializeDetailCMProduct(self);
  return (
    <>
      <SeoHeader title={product.title} />
      <DetailedCMProduct {...product} />
    </>
  );
};
export default CMProductAsDetail;
