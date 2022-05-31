import React from "react";
import styled from "styled-components";
import { metaDataElement, metaDataProperty } from "../../utils/Preview/MetaData";
import { Banner } from "../../models/Banner/Banner";
import BannerCaption, { Text } from "../Caption/BannerCaption";
import CTA, { StyledCTA } from "../CTA/CTA";
import { supportsPricing, supportsShopNow } from "../../models/Banner/ProductBanner";
import Link from "../Link/Link";
import { Caption, StyledBanner } from "../LandscapeBanner/LandscapeBanner";
import { ImageBox } from "../Media/ResponsiveImage";
import ShopNowButton, { ShowNow } from "../Product/ShopNowButton";
import ProductPricing from "../Product/ProductPricing";
import StaticCode from "../StaticCode/StaticCode";
import { supportsVideo } from "../../models/Banner/VideoBanner";
import ModalVideo, { PlayButton } from "../Media/ModalVideo";
import PortraitResponsiveImage from "./PortraitResponsiveImage";

export const StyledPortraitBanner = styled(StyledBanner)`
  ${ImageBox} {
    --aspect-ratio: 1 * 1;

    @media screen and (min-width: 768px) {
      --aspect-ratio: 2 * 3;
    }
  }

  ${StyledCTA} {
    margin-top: auto;
  }

  ${Text} {
    --max-lines: 3;
  }

  ${ShowNow}:before, ${PlayButton}:before {
    padding-top: calc(3 / 2 * 100%);
  }
`;

export const PortraitCaption = styled(Caption)`
  bottom: 50%;
`;

const PortraitBanner: React.FC<Banner> = (banner) => {
  if (banner.code) {
    return <StaticCode {...banner} />;
  }
  return (
    <StyledPortraitBanner {...metaDataElement(banner.metadata?.root)}>
      {banner.picture && (
        <Link
          to={supportsVideo(banner) === true ? "" : banner.linkTarget}
          externalLink={banner.externalLink}
          openInNewTab={banner.openInNewTab}
        >
          <div {...metaDataProperty(banner.metadata?.properties?.picture)}>
            <PortraitResponsiveImage picture={banner.picture} />
            {supportsVideo(banner) && <ModalVideo banner={banner} />}
          </div>
        </Link>
      )}
      <PortraitCaption>
        <BannerCaption {...banner} />
        {supportsPricing(banner) && <ProductPricing {...banner} />}
        {banner.targets && <CTA targets={banner.targets} />}
      </PortraitCaption>
      {supportsShopNow(banner) && <ShopNowButton banner={banner} />}
    </StyledPortraitBanner>
  );
};

export default PortraitBanner;
