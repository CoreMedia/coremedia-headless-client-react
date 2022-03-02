import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { initializeProductBannerFromExternalProduct, ProductBanner } from "../../../models/Banner/ProductBanner";
import HeroBannerProduct from "../HeroBannerProduct";
import { ExternalProduct } from "@coremedia-labs/graphql-layer";

const CMExternalProductAsHeroBanner: React.FC<IncludeProps<ExternalProduct>> = ({ self }) => {
  const banner: ProductBanner = initializeProductBannerFromExternalProduct(self);
  return <HeroBannerProduct banner={banner} />;
};
export default CMExternalProductAsHeroBanner;
