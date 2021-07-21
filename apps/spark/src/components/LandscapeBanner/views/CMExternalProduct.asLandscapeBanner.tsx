import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import LandscapeProductBanner from "../LandscapeProductBanner";
import { initializeProductBannerFromExternalProduct, ProductBanner } from "../../../models/Banner/ProductBanner";
import { ExternalProduct } from "../../../queries/fragments/__generated__/ExternalProduct";

const CMExternalProductAsLandscapeBanner: React.FC<IncludeProps<ExternalProduct>> = ({ self }) => {
  const banner: ProductBanner = initializeProductBannerFromExternalProduct(self);
  return <LandscapeProductBanner banner={banner} />;
};

export default CMExternalProductAsLandscapeBanner;
