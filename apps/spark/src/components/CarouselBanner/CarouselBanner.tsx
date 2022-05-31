import React from "react";
import styled from "styled-components";
import { metaDataElement, metaDataProperty } from "../../utils/Preview/MetaData";
import { Banner } from "../../models/Banner/Banner";
import { supportsPricing, supportsShopNow } from "../../models/Banner/ProductBanner";
import CTA from "../CTA/CTA";
import BannerCaption from "../Caption/BannerCaption";

import Link from "../Link/Link";
import { Caption, StyledBanner } from "../LandscapeBanner/LandscapeBanner";
import { ImageBox } from "../Media/ResponsiveImage";
import ShopNowButton, { ShowNow } from "../Product/ShopNowButton";
import ProductPricing from "../Product/ProductPricing";
import StaticCode from "../StaticCode/StaticCode";
import { supportsVideo } from "../../models/Banner/VideoBanner";
import ModalVideo, { PlayButton } from "../Media/ModalVideo";
import CarouselResponsiveImage from "./CarouselResponsiveImage";

interface Props {
  banner: Banner;
}

export const StyledCarouselBanner = styled(StyledBanner)`
  align-content: stretch;
  height: 100%;

  ${ImageBox} {
    --aspect-ratio: 1 * 1;

    @media screen and (min-width: 768px) {
      --aspect-ratio: 2 * 3;
    }
  }

  ${ShowNow}:before,${PlayButton}:before {
    padding-top: calc(3 / 2 * 100%);
  }
`;

export const CarouselCaption = styled(Caption)``;

const CarouselBanner: React.FC<Props> = ({ banner }) => {
  if (banner.code) {
    return <StaticCode {...banner} />;
  }
  return (
    <StyledCarouselBanner {...metaDataElement(banner.metadata?.root)}>
      {banner.picture && (
        <Link
          to={supportsVideo(banner) === true ? "" : banner.linkTarget}
          externalLink={banner.externalLink}
          openInNewTab={banner.openInNewTab}
        >
          <div {...metaDataProperty(banner.metadata?.properties?.picture)}>
            <CarouselResponsiveImage picture={banner.picture} />
            {supportsVideo(banner) && <ModalVideo banner={banner} />}
          </div>
        </Link>
      )}
      <CarouselCaption>
        <BannerCaption {...banner} />
        {supportsPricing(banner) && <ProductPricing {...banner} />}
        {banner.targets && <CTA targets={banner.targets} />}
      </CarouselCaption>
      {supportsShopNow(banner) && <ShopNowButton banner={banner} />}
    </StyledCarouselBanner>
  );
};

export default CarouselBanner;
