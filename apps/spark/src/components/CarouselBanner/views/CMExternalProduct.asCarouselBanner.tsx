import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import CarouselProductBanner from "../CarouselProductBanner";
import { initializeProductBannerFromExternalProduct, ProductBanner } from "../../../models/Banner/ProductBanner";
import { ExternalProduct } from "../../../queries/fragments/__generated__/ExternalProduct";

const CMExternalProductAsCarouselBanner: React.FC<IncludeProps<ExternalProduct>> = ({ self }) => {
  const banner: ProductBanner = initializeProductBannerFromExternalProduct(self);
  return <CarouselProductBanner banner={banner} />;
};

export default CMExternalProductAsCarouselBanner;
