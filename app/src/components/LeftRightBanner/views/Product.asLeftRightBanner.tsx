import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { Product } from "../../../queries/fragments/__generated__/Product";
import LeftRightProduct from "../LeftRightProduct";
import { useSiteContextState } from "../../../context/SiteContextProvider";
import { initializeProductBannerFromProduct, ProductBanner } from "../../../models/Banner/ProductBanner";

const ProductAsLeftRightBanner: React.FC<IncludeProps<Product>> = ({ self }) => {
  const { rootSegment } = useSiteContextState();
  const banner: ProductBanner = initializeProductBannerFromProduct(self, rootSegment);
  return <LeftRightProduct banner={banner} />;
};

export default ProductAsLeftRightBanner;
