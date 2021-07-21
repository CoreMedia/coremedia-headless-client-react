import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { initializeProductBannerFromExternalProduct, ProductBanner } from "../../../models/Banner/ProductBanner";
import SquareProductBanner from "../SquareProductBanner";
import { ExternalProduct } from "../../../queries/fragments/__generated__/ExternalProduct";

const CMExternalProductAsSquareBanner: React.FC<IncludeProps<ExternalProduct>> = ({ self }) => {
  const banner: ProductBanner = initializeProductBannerFromExternalProduct(self);

  return <SquareProductBanner banner={banner} />;
};

export default CMExternalProductAsSquareBanner;
