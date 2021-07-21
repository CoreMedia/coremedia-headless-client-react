import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { Product } from "../../../queries/fragments/__generated__/Product";
import { initializeProductBannerFromProduct, ProductBanner } from "../../../models/Banner/ProductBanner";
import HeroBannerProduct from "../HeroBannerProduct";

const ProductAsHeroBanner: React.FC<IncludeProps<Product>> = ({ self }) => {
  const banner: ProductBanner = initializeProductBannerFromProduct(self);
  return <HeroBannerProduct banner={banner} />;
};

export default ProductAsHeroBanner;
