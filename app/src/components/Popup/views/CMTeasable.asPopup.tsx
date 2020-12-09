import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { Teasable } from "../../../queries/fragments/__generated__/Teasable";
import { OverlayConfiguration } from "../../ImageMap/ImageMapHelpers";
import PopupBanner from "../PopupBanner";
import { useSiteContextState } from "../../../context/SiteContextProvider";
import { Banner, initializeBanner } from "../../../models/Banner/Banner";

const CMTeasableAsPopup: React.FC<IncludeProps<Teasable>> = ({ self, params }) => {
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
  const banner: Banner = initializeBanner(self, rootSegment);

  return <PopupBanner banner={banner} overlay={overlay} />;
};

export default CMTeasableAsPopup;
