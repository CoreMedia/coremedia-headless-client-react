import React from "react";
import { metaDataElement, metaDataProperty } from "../../utils/Preview/MetaData";
import HeroResponsiveImage from "./HeroResponsiveImage";
import OverlayWithCtas from "../Overlay/OverlayWithCtas";
import "./HeroBanner.scss";
import BannerCaption from "../Caption/BannerCaption";
import CTA from "../CTA/CTA";
import ProductPricing from "../Product/ProductPricing";
import { ProductBanner } from "../../models/Banner/ProductBanner";

interface Props {
  banner: ProductBanner;
}

const HeroBannerProduct: React.FC<Props> = ({ banner }) => {
  const teaserBlockClass = "cm-hero-banner";
  return (
    <div className={`cm-hero-banner`} {...metaDataElement(banner.metadata?.root)}>
      {banner.picture && (
        <div className={`cm-hero-banner__picture`} {...metaDataProperty(banner.metadata?.properties?.picture)}>
          <HeroResponsiveImage picture={banner.picture} />
        </div>
      )}
      {banner.overlayRequired && <OverlayWithCtas {...banner} />}
      {!banner.overlayRequired && (
        <div className={`${teaserBlockClass}__caption`}>
          <BannerCaption {...banner} />
          <ProductPricing {...banner} />
          {banner.targets && <CTA targets={banner.targets} additionalClass={`${teaserBlockClass}__cta`} />}
        </div>
      )}
    </div>
  );
};

export default HeroBannerProduct;
