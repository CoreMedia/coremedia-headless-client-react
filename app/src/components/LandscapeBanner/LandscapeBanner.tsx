import React from "react";
import { metaDataElement, metaDataProperty } from "../../utils/Preview/MetaData";
import LandscapeResponsiveImage from "./LandscapeResponsiveImage";
import "./LandscapeBanner.scss";
import { Banner } from "../../models/Banner/Banner";
import BannerCaption from "../Caption/BannerCaption";
import CTA from "../CTA/CTA";

interface Props {
  banner: Banner;
}

const LandscapeBanner: React.FC<Props> = ({ banner }) => {
  return (
    <div className={`cm-landscape-banner`} {...metaDataElement(banner.metadata?.root)}>
      {banner.picture && (
        <div className={`cm-landscape-banner__picture`} {...metaDataProperty(banner.metadata?.picture)}>
          <LandscapeResponsiveImage picture={banner.picture} />
        </div>
      )}
      <div className={`cm-landscape-banner__caption`}>
        <BannerCaption {...banner} />
        {banner.targets && <CTA targets={banner.targets} additionalClass={`cm-landscape-banner__cta`} />}
      </div>
    </div>
  );
};

export default LandscapeBanner;
