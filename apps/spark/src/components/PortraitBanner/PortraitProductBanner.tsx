import React from "react";
import { metaDataElement, metaDataProperty } from "../../utils/Preview/MetaData";
import ShopNowButton from "../Product/ShopNowButton";
import PortraitResponsiveImage from "./PortraitResponsiveImage";
import { ProductBanner } from "../../models/Banner/ProductBanner";
import BannerCaption from "../Caption/BannerCaption";
import ProductPricing from "../Product/ProductPricing";

interface Props {
  banner: ProductBanner;
}

const PortraitProductBanner: React.FC<Props> = ({ banner }) => {
  return (
    <div className={`cm-portrait-banner`} {...metaDataElement(banner.metadata?.root)}>
      {banner.picture && (
        <div className={`cm-portrait-banner__picture`} {...metaDataProperty(banner.metadata?.properties?.picture)}>
          <PortraitResponsiveImage picture={banner.picture} />
        </div>
      )}
      <div className={`cm-portrait-banner__caption`}>
        <BannerCaption {...banner} />
        <ProductPricing {...banner} />
      </div>
      <ShopNowButton banner={banner} />
    </div>
  );
};

export default PortraitProductBanner;
