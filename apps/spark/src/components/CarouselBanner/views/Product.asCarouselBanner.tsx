import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { Product } from "../../../queries/fragments/__generated__/Product";
import { initializeProductBannerFromProduct, ProductBanner } from "../../../models/Banner/ProductBanner";
import CarouselProductBanner from "../CarouselProductBanner";

const ProductAsPortraitBanner: React.FC<IncludeProps<Product>> = ({ self }) => {
  const banner: ProductBanner = initializeProductBannerFromProduct(self);
  return <CarouselProductBanner banner={banner} />;
};

export default ProductAsPortraitBanner;
