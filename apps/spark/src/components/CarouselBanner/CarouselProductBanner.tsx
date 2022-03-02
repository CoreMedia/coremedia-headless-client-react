import React from "react";
import { metaDataElement, metaDataProperty } from "../../utils/Preview/MetaData";
import CarouselResponsiveImage from "./CarouselResponsiveImage";
import ShopNowButton from "../Product/ShopNowButton";
import { ProductBanner } from "../../models/Banner/ProductBanner";
import BannerCaption from "../Caption/BannerCaption";
import ProductPricing from "../Product/ProductPricing";
import Link from "../Link/Link";

interface Props {
  banner: ProductBanner;
}

const CarouselProductBanner: React.FC<Props> = ({ banner }) => {
  return (
    <div className={`cm-carousel-banner`} {...metaDataElement(banner.metadata?.root)}>
      {banner.picture && (
        <Link to={banner.linkTarget} externalLink={banner.externalLink} openInNewTab={banner.openInNewTab}>
          <div className={`cm-carousel-banner__picture`} {...metaDataProperty(banner.metadata?.properties?.picture)}>
            <CarouselResponsiveImage picture={banner.picture} />
          </div>
        </Link>
      )}
      <div className={`cm-carousel-banner__caption`}>
        <BannerCaption {...banner} />
        <ProductPricing {...banner} />
      </div>
      <ShopNowButton banner={banner} />
    </div>
  );
};

export default CarouselProductBanner;
