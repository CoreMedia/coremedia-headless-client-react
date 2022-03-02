import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { initializeProductBannerFromExternalProduct, ProductBanner } from "../../../models/Banner/ProductBanner";
import SquareProductBanner from "../SquareProductBanner";
import { ExternalProduct } from "@coremedia-labs/graphql-layer";

const CMExternalProductAsSquareBanner: React.FC<IncludeProps<ExternalProduct>> = ({ self }) => {
  const banner: ProductBanner = initializeProductBannerFromExternalProduct(self);

  return <SquareProductBanner banner={banner} />;
};

export default CMExternalProductAsSquareBanner;
