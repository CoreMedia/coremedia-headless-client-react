import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import PortraitProductBanner from "../PortraitProductBanner";
import { initializeProductBannerFromExternalProduct, ProductBanner } from "../../../models/Banner/ProductBanner";
import { ExternalProduct } from "../../../queries/fragments/__generated__/ExternalProduct";

const CMExternalProductAsPortraitBanner: React.FC<IncludeProps<ExternalProduct>> = ({ self }) => {
  const banner: ProductBanner = initializeProductBannerFromExternalProduct(self);

  return <PortraitProductBanner banner={banner} />;
};

export default CMExternalProductAsPortraitBanner;
