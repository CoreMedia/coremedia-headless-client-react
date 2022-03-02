import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { Product } from "@coremedia-labs/graphql-layer";
import LeftRightProduct from "../LeftRightProduct";
import { initializeProductBannerFromProduct, ProductBanner } from "../../../models/Banner/ProductBanner";

const ProductAsLeftRightBanner: React.FC<IncludeProps<Product>> = ({ self }) => {
  const banner: ProductBanner = initializeProductBannerFromProduct(self);
  return <LeftRightProduct banner={banner} />;
};

export default ProductAsLeftRightBanner;
