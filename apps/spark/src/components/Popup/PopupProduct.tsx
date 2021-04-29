import React from "react";
import { OverlayConfiguration } from "../ImageMap/ImageMapHelpers";
import PopupBanner from "./PopupBanner";
import ProductPricing from "../Product/ProductPricing";
import { ProductBanner } from "../../models/Banner/ProductBanner";
interface Props {
  banner: ProductBanner;
  overlay: OverlayConfiguration;
}

const PopupProduct: React.FC<Props> = ({ banner, overlay }) => {
  return (
    <PopupBanner banner={banner} overlay={overlay}>
      {(overlay.displayDefaultPrice || overlay.displayDiscountedPrice) && (
        <div className="cm-popup__price">
          <ProductPricing
            {...banner}
            showListPrice={overlay.displayDefaultPrice}
            showOfferPrice={overlay.displayDiscountedPrice}
            classListPrice={"cm-popup__listprice"}
            classOfferPrice={"cm-popup__offerprice"}
          />
        </div>
      )}
    </PopupBanner>
  );
};

export default PopupProduct;
