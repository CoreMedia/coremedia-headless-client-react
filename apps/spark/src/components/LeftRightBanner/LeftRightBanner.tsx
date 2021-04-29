import React from "react";
import { metaDataElement, metaDataProperty } from "../../utils/Preview/MetaData";
import LeftRightResponsiveImage from "./LeftRightResponsiveImage";
import { Banner } from "../../models/Banner/Banner";
import Editorial from "../Caption/Editorial";
import BannerCaption from "../Caption/BannerCaption";
import CTA from "../CTA/CTA";
import Link from "../Link/Link";

import "./LeftRightBanner.scss";

interface Props {
  banner: Banner;
}

const LeftRightBanner: React.FC<Props> = ({ banner }) => {
  return (
    <div className={`cm-left-right-banner`} {...metaDataElement(banner.metadata?.root)}>
      {banner.picture && (
        <div className={`cm-left-right-banner__picture`} {...metaDataProperty(banner.metadata?.picture)}>
          <Link to={banner.linkTarget || ""} openInNewTab={banner.openInNewTab} externalLink={banner.externalLink}>
            <LeftRightResponsiveImage picture={banner.picture} />
          </Link>
        </div>
      )}
      <div className={`cm-left-right-banner__caption`}>
        <Editorial {...banner} teaserBlockClass={`cm-left-right-banner`} />
        <BannerCaption {...banner} />
        {banner.targets && <CTA targets={banner.targets} />}
      </div>
    </div>
  );
};

export default LeftRightBanner;
