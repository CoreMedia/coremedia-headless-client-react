import React from "react";
import { metaDataElement, metaDataProperty } from "../../utils/Preview/MetaData";
import ShopNowButton from "../Product/ShopNowButton";
import { ProductBanner } from "../../models/Banner/ProductBanner";
import BannerCaption from "../Caption/BannerCaption";
import SquareResponsiveImage from "./SquareResponsiveImage";
import OverlayWithCtas from "../Overlay/OverlayWithCtas";
import ProductPricing from "../Product/ProductPricing";
import Link from "../Link/Link";

interface Props {
  banner: ProductBanner;
}

const SquareProductBanner: React.FC<Props> = ({ banner }) => {
  return (
    <div className={`cm-square-banner`} {...metaDataElement(banner.metadata?.root)}>
      {banner.picture && (
        <Link to={banner.linkTarget} externalLink={banner.externalLink} openInNewTab={banner.openInNewTab}>
          <div className={`cm-square-banner__picture`} {...metaDataProperty(banner.metadata?.properties?.picture)}>
            <SquareResponsiveImage picture={banner.picture} />
          </div>
        </Link>
      )}
      {banner.overlayRequired && <OverlayWithCtas {...banner} />}
      {!banner.overlayRequired && (
        <div className={`cm-square-banner__caption`}>
          <BannerCaption {...banner} />
          <ProductPricing {...banner} />
        </div>
      )}
      <ShopNowButton banner={banner} />
    </div>
  );
};

export default SquareProductBanner;
