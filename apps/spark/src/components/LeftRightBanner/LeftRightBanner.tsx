import React from "react";
import styled from "styled-components";
import { metaDataElement, metaDataProperty } from "../../utils/Preview/MetaData";
import { Banner } from "../../models/Banner/Banner";
import Editorial, { StyledAuthor, StyledEditorial } from "../Caption/Editorial";
import BannerCaption, { Text } from "../Caption/BannerCaption";
import { supportsPricing, supportsShopNow } from "../../models/Banner/ProductBanner";
import CTA from "../CTA/CTA";
import Link from "../Link/Link";
import { ImageBox } from "../Media/ResponsiveImage";
import ShopNowButton, { ShowNow } from "../Product/ShopNowButton";
import ProductPricing from "../Product/ProductPricing";
import StaticCode from "../StaticCode/StaticCode";
import { supportsVideo } from "../../models/Banner/VideoBanner";
import VideoPlayer from "../Media/VideoPlayer";
import LeftRightResponsiveImage from "./LeftRightResponsiveImage";

export const StyledPicture = styled.div``;
export const StyledCaption = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  box-sizing: border-box;
  padding: var(--padding-medium);
  font-size: var(--font-size-text-small);

  @media screen and (min-width: 768px) {
    justify-content: center;
  }

  @media screen and (min-width: 768px) and (orientation: landscape), screen and (min-width: 1200px) {
    padding-left: 10%;
    padding-right: 10%;
  }

  > :last-child {
    margin-bottom: 0;
  }
`;

export const StyledLeftRightBanner = styled.div`
  position: relative;
  @media screen and (min-width: 768px) {
    display: flex;
    flex-direction: row;

    &:nth-child(2n) {
      flex-direction: row-reverse;
    }

    ${StyledPicture},
    ${StyledCaption} {
      flex: 0 0 auto;
      width: 50%;
    }
  }

  ${ImageBox} {
    --aspect-ratio: 4 * 3;
  }

  ${Text} {
    --max-lines: 3;
    flex-grow: inherit;
  }

  ${StyledEditorial} {
    margin: 0 0 10px 0;

    span + span:before {
      content: "•";
      margin: 0 6px;
      display: inline-block;
    }

    ${StyledAuthor} {
      text-decoration: underline;
      color: var(--color-background-grey);

      &:hover {
        text-decoration: none;
      }
    }
  }

  ${ShowNow}:before {
    padding-top: calc(3 / 2 * 100%);
  }

  @media screen and (min-width: 768px) and (orientation: landscape), screen and (min-width: 1200px) {
    :hover > ${ShowNow} {
      display: block;
    }
  }
`;

const LeftRightBanner: React.FC<Banner> = (banner) => {
  if (banner.code) {
    return <StaticCode {...banner} />;
  }
  return (
    <StyledLeftRightBanner {...metaDataElement(banner.metadata?.root)}>
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
            {banner.picture && <LeftRightResponsiveImage picture={banner.picture} />}
          </Link>
        </StyledPicture>
      )}
      <StyledCaption>
        <Editorial {...banner} />
        <BannerCaption {...banner} />
        {supportsPricing(banner) && <ProductPricing {...banner} />}
        {banner.targets && <CTA targets={banner.targets} />}
      </StyledCaption>
      {supportsShopNow(banner) && <ShopNowButton banner={banner} />}
    </StyledLeftRightBanner>
  );
};

export default LeftRightBanner;
