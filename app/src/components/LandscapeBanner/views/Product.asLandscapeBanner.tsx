import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { Product } from "../../../queries/fragments/__generated__/Product";
import { useSiteContextState } from "../../../context/SiteContextProvider";
import { initializeProductBannerFromProduct, ProductBanner } from "../../../models/Banner/ProductBanner";
import LandscapeProductBanner from "../LandscapeProductBanner";

const ProductAsLandscapeBanner: React.FC<IncludeProps<Product>> = ({ self }) => {
  const { rootSegment } = useSiteContextState();
  const banner: ProductBanner = initializeProductBannerFromProduct(self, rootSegment);
  return <LandscapeProductBanner banner={banner} />;
};

export default ProductAsLandscapeBanner;
