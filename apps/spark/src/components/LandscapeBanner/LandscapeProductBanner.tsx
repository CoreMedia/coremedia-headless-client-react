import React from "react";
import { metaDataElement, metaDataProperty } from "../../utils/Preview/MetaData";
import ShopNowButton from "../Product/ShopNowButton";
import LandscapeResponsiveImage from "./LandscapeResponsiveImage";
import { ProductBanner } from "../../models/Banner/ProductBanner";
import BannerCaption from "../Caption/BannerCaption";
import ProductPricing from "../Product/ProductPricing";
import Link from "../Link/Link";

interface Props {
  banner: ProductBanner;
}

const LandscapeProductBanner: React.FC<Props> = ({ banner }) => {
  return (
    <div className={`cm-landscape-banner`} {...metaDataElement(banner.metadata?.root)}>
      {banner.picture && (
        <Link to={banner.linkTarget} externalLink={banner.externalLink} openInNewTab={banner.openInNewTab}>
          <div className={`cm-landscape-banner__picture`} {...metaDataProperty(banner.metadata?.properties?.picture)}>
            <LandscapeResponsiveImage picture={banner.picture} />
          </div>
        </Link>
      )}
      <div className={`cm-landscape-banner__caption`}>
        <BannerCaption {...banner} />
        <ProductPricing {...banner} />
      </div>
      <ShopNowButton banner={banner} />
    </div>
  );
};

export default LandscapeProductBanner;
