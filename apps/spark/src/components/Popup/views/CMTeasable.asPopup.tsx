import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { Teasable } from "@coremedia-labs/graphql-layer";
import { OverlayConfiguration } from "../../ImageMap/ImageMapHelpers";
import PopupBanner from "../PopupBanner";
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

  const banner: Banner = initializeBanner(self);

  return <PopupBanner banner={banner} overlay={overlay} />;
};

export default CMTeasableAsPopup;
