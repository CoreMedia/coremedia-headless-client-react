import React from "react";
import { metaDataElement, metaDataProperty } from "../../utils/Preview/MetaData";
import LandscapeResponsiveImage from "./LandscapeResponsiveImage";
import "./LandscapeBanner.scss";
import { Banner } from "../../models/Banner/Banner";
import BannerCaption from "../Caption/BannerCaption";
import CTA from "../CTA/CTA";
import Link from "../Link/Link";

interface Props {
  banner: Banner;
}

const LandscapeBanner: React.FC<Props> = ({ banner }) => {
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
        {banner.targets && <CTA targets={banner.targets} additionalClass={`cm-landscape-banner__cta`} />}
      </div>
    </div>
  );
};

export default LandscapeBanner;
