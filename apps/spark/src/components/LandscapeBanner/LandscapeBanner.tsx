import React from "react";
import styled from "styled-components";
import { metaDataElement, metaDataProperty } from "../../utils/Preview/MetaData";
import { Banner } from "../../models/Banner/Banner";
import BannerCaption, { Text } from "../Caption/BannerCaption";
import CTA, { StyledCTA } from "../CTA/CTA";
import { supportsPricing, supportsShopNow } from "../../models/Banner/ProductBanner";
import Link from "../Link/Link";
import { ImageBox } from "../Media/ResponsiveImage";
import ShopNowButton, { ShowNow } from "../Product/ShopNowButton";
import ProductPricing from "../Product/ProductPricing";
import StaticCode from "../StaticCode/StaticCode";
import { supportsVideo } from "../../models/Banner/VideoBanner";
import ModalVideo, { PlayButton } from "../Media/ModalVideo";
import LandscapeResponsiveImage from "./LandscapeResponsiveImage";

export const StyledBanner = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;

  ${StyledCTA} {
    margin-top: auto;
  }

  @media screen and (min-width: 768px) and (orientation: landscape), screen and (min-width: 1200px) {
    :hover > ${ShowNow} {
      display: block;
    }
  }
`;

const StyledLandscapeBanner = styled(StyledBanner)`
  ${ImageBox} {
    --aspect-ratio: 16 * 9;
  }

  ${Text} {
    --max-lines: 3;
  }

  ${ShowNow}:before,${PlayButton}:before { {
    padding-top: calc(9 / 16 * 100%);
  }
`;

export const Caption = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: center;
  padding: 10px;
  position: static;
  transform: none;
  box-sizing: border-box;
  font-size: var(--font-size-text-small);
  flex: 1 1 auto;
  flex-grow: 1;

  > :last-child {
    margin-bottom: 0;
  }
`;

const LandscapeBanner: React.FC<Banner> = (banner) => {
  if (banner.code) {
    return <StaticCode {...banner} />;
  }
  return (
    <StyledLandscapeBanner {...metaDataElement(banner.metadata?.root)}>
      {banner.picture && (
        <Link
          to={supportsVideo(banner) === true ? "" : banner.linkTarget}
          externalLink={banner.externalLink}
          openInNewTab={banner.openInNewTab}
        >
          <div {...metaDataProperty(banner.metadata?.properties?.picture)}>
            <LandscapeResponsiveImage picture={banner.picture} />
            {supportsVideo(banner) && <ModalVideo banner={banner} />}
          </div>
        </Link>
      )}
      <Caption>
        <BannerCaption {...banner} />
        {supportsPricing(banner) && <ProductPricing {...banner} />}
        {banner.targets && <CTA targets={banner.targets} />}
      </Caption>
      {supportsShopNow(banner) && <ShopNowButton banner={banner} />}
    </StyledLandscapeBanner>
  );
};

export default LandscapeBanner;
