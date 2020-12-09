import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { ProductTeaser } from "../../../queries/fragments/__generated__/ProductTeaser";
import { OverlayConfiguration } from "../../ImageMap/ImageMapHelpers";
import PopupProduct from "../PopupProduct";
import { useSiteContextState } from "../../../context/SiteContextProvider";
import { initializeProductBannerFromProductTeaser, ProductBanner } from "../../../models/Banner/ProductBanner";

const CMTeasableAsPopup: React.FC<IncludeProps<ProductTeaser>> = ({ self, params }) => {
  const overlay: OverlayConfiguration = {
    displayTitle: false,
    displayShortText: false,
    displayPicture: false,
    displayDefaultPrice: false,
    displayDiscountedPrice: false,
    displayOutOfStockLink: false,
    ...params,
  };

  const { rootSegment } = useSiteContextState();
  const banner: ProductBanner = initializeProductBannerFromProductTeaser(self, rootSegment);

  return <PopupProduct banner={banner} overlay={overlay} />;
};

export default CMTeasableAsPopup;
