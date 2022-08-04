import React from "react";
import styled from "styled-components";
import { metaDataElement, metaDataProperty } from "../../utils/Preview/MetaData";
import OverlayWithCtas from "../Overlay/OverlayWithCtas";
import { Banner } from "../../models/Banner/Banner";
import BannerCaption, { Headline, Text, Title } from "../Caption/BannerCaption";
import { supportsImagemap } from "../../models/Banner/ImagemapBanner";
import { supportsPricing } from "../../models/Banner/ProductBanner";
import { supportsVideo } from "../../models/Banner/VideoBanner";
import CTA from "../CTA/CTA";
import ImageMapAreas from "../ImageMap/ImageMapAreas";
import Link from "../Link/Link";
import { ImageBox } from "../Media/ResponsiveImage";
import { Caption } from "../SquareBanner/SquareBanner";
import { StyledOverlay, StyledOverlayText } from "../Overlay/Overlay";
import ProductPricing, { StyledPricing } from "../Product/ProductPricing";
import VideoPlayer from "../Media/VideoPlayer";
import StaticCode from "../StaticCode/StaticCode";
import HeroResponsiveImage from "./HeroResponsiveImage";

interface Props {
  banner: Banner;
}

export const StyledBanner = styled.div`
  position: relative;
  font-family: var(--font-family-text);
  font-size: var(--font-size-text);
  margin: 0;

  ${ImageBox} {
    --aspect-ratio: 1 * 1;

    @media screen and (orientation: landscape) and (max-width: 767px), (min-width: 768px) {
      --aspect-ratio: 8 * 3;
    }

    //Tablet Portrait --> 16:9
    @media screen and (orientation: portrait) and (min-width: 768px) and (max-width: 1199px) {
      --aspect-ratio: 16 * 9;
    }
  }

  ${StyledOverlay} {
    > :last-child {
      margin-bottom: 0;
    }
  }

  ${StyledOverlayText} {
    margin-bottom: 12px;
  }

  ${Text} {
    --max-lines: 2;
    margin-bottom: 12px;
  }

  ${Title}, ${Headline}, ${Text} {
    color: #fff;
    margin: 0;
  }

  ${Title}, ${Headline} {
    font-family: var(--font-family-headline);
    font-size: var(--font-size-heading-2);
    line-height: 1.6;
    text-decoration: none;
  }

  ${Headline}:hover {
    text-decoration: underline;
  }

  ${StyledPricing} {
    color: #fff;
  }
`;

const HeroBanner: React.FC<Props> = ({ banner }) => {
  if (banner.code) {
    return <StaticCode {...banner} />;
  }
  return (
    <StyledBanner {...metaDataElement(banner.metadata?.root)}>
      {supportsVideo(banner) && (
        <VideoPlayer
          video={banner.video}
          controls={false}
          autoPlay={true}
          muted={true}
          loop={true}
          metadata={banner.metadata}
        />
      )}
      {supportsVideo(banner) === false && banner.picture && (
        <div {...metaDataProperty(banner.metadata?.properties?.picture)}>
          <Link to={banner.linkTarget} externalLink={banner.externalLink} openInNewTab={banner.openInNewTab}>
            {banner.picture && <HeroResponsiveImage picture={banner.picture} />}
          </Link>
          {supportsImagemap(banner) && <ImageMapAreas {...banner} cropName={"landscape_ratio8x3"} />}
        </div>
      )}
      {banner.overlayRequired && <OverlayWithCtas {...banner} />}
      {!banner.overlayRequired && (
        <Caption>
          <BannerCaption {...banner} />
          {supportsPricing(banner) && <ProductPricing {...banner} />}
          {banner.targets && <CTA targets={banner.targets} />}
        </Caption>
      )}
    </StyledBanner>
  );
};

export default HeroBanner;
