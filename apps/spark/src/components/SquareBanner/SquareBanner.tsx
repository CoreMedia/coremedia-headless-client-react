import React from "react";
import styled from "styled-components";
import { metaDataElement, metaDataProperty } from "../../utils/Preview/MetaData";
import OverlayWithCtas from "../Overlay/OverlayWithCtas";
import { Banner } from "../../models/Banner/Banner";
import { supportsPricing, supportsShopNow } from "../../models/Banner/ProductBanner";
import CTA from "../CTA/CTA";
import BannerCaption, { Headline, Text, Title } from "../Caption/BannerCaption";
import Link from "../Link/Link";
import { ImageBox } from "../Media/ResponsiveImage";
import { StyledOverlay, StyledOverlayText } from "../Overlay/Overlay";
import ProductPricing, { StyledPricing } from "../Product/ProductPricing";
import ShopNowButton from "../Product/ShopNowButton";
import StaticCode from "../StaticCode/StaticCode";
import { supportsVideo } from "../../models/Banner/VideoBanner";
import VideoPlayer from "../Media/VideoPlayer";
import { StyledPicture } from "../LeftRightBanner/LeftRightBanner";
import SquareResponsiveImage from "./SquareResponsiveImage";

export const StyledSquareBanner = styled.div`
  position: relative;
  margin: 0;

  ${ImageBox} {
    --aspect-ratio: 1 * 1;
  }

  ${StyledOverlay} {
    > :last-child {
      margin-bottom: 0;
    }
  }

  ${StyledOverlayText} {
    margin-bottom: 12px;
  }

  ${Title}, ${Headline}, ${Text} {
    color: #fff;
    margin: 0;
  }

  ${StyledPricing} {
    color: #fff;
  }
`;

export const Caption = styled.div`
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  bottom: var(--padding-medium);
  text-align: center;
  padding: 0 8%;
  text-shadow: 0 0 var(--padding-small) var(--color-background-dark);

  > :last-child {
    margin-bottom: 0;
  }
`;

const SquareBanner: React.FC<Banner> = (banner) => {
  if (banner.code) {
    return <StaticCode {...banner} />;
  }
  return (
    <StyledSquareBanner {...metaDataElement(banner.metadata?.root)}>
      {supportsVideo(banner) && (
        <StyledPicture>
          <Link to={banner.linkTarget} externalLink={banner.externalLink} openInNewTab={banner.openInNewTab}>
            <VideoPlayer
              video={banner.video}
              controls={false}
              autoPlay={true}
              muted={true}
              loop={true}
              metadata={banner.metadata}
            />
          </Link>
        </StyledPicture>
      )}
      {supportsVideo(banner) === false && banner.picture && (
        <StyledPicture {...metaDataProperty(banner.metadata?.properties?.picture)}>
          <Link to={banner.linkTarget} externalLink={banner.externalLink} openInNewTab={banner.openInNewTab}>
            {banner.picture && <SquareResponsiveImage picture={banner.picture} />}
          </Link>
        </StyledPicture>
      )}
      {banner.overlayRequired && <OverlayWithCtas {...banner} />}
      {!banner.overlayRequired && (
        <Caption>
          <BannerCaption {...banner} />
          {supportsPricing(banner) && <ProductPricing {...banner} />}
          {banner.targets && <CTA targets={banner.targets} />}
        </Caption>
      )}
      {supportsShopNow(banner) && <ShopNowButton banner={banner} />}
    </StyledSquareBanner>
  );
};

export default SquareBanner;
