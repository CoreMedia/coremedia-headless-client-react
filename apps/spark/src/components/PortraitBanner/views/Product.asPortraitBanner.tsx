import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { Product } from "@coremedia-labs/graphql-layer";
import { initializeProductBannerFromProduct, ProductBanner } from "../../../models/Banner/ProductBanner";
import PortraitProductBanner from "../PortraitProductBanner";

const ProductAsPortraitBanner: React.FC<IncludeProps<Product>> = ({ self }) => {
  const banner: ProductBanner = initializeProductBannerFromProduct(self);
  return <PortraitProductBanner banner={banner} />;
};

export default ProductAsPortraitBanner;
