import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import LeftRightProduct from "../LeftRightProduct";
import { initializeProductBannerFromExternalProduct, ProductBanner } from "../../../models/Banner/ProductBanner";
import { ExternalProduct } from "@coremedia-labs/graphql-layer";

const CMExternalProductAsLeftRightBanner: React.FC<IncludeProps<ExternalProduct>> = ({ self }) => {
  const banner: ProductBanner = initializeProductBannerFromExternalProduct(self);
  return <LeftRightProduct banner={banner} />;
};

export default CMExternalProductAsLeftRightBanner;
