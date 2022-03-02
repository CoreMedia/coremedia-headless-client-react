import React from "react";
import { metaDataElement, metaDataProperty } from "../../utils/Preview/MetaData";
import CarouselResponsiveImage from "./CarouselResponsiveImage";
import "./CarouselBanner.scss";
import { Banner } from "../../models/Banner/Banner";
import BannerCaption from "../Caption/BannerCaption";
import CTA from "../CTA/CTA";
import Link from "../Link/Link";

interface Props {
  banner: Banner;
}

const CarouselBanner: React.FC<Props> = ({ banner }) => {
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
        {banner.targets && <CTA targets={banner.targets} additionalClass={`cm-carousel-banner__cta`} />}
      </div>
    </div>
  );
};

export default CarouselBanner;
