import React from "react";
import { metaDataElement, metaDataProperty } from "../../utils/Preview/MetaData";
import PortraitResponsiveImage from "./PortraitResponsiveImage";
import { Banner } from "../../models/Banner/Banner";
import BannerCaption from "../Caption/BannerCaption";
import CTA from "../CTA/CTA";
import "./PortraitBanner.scss";

interface Props {
  banner: Banner;
}

const PortraitBanner: React.FC<Props> = ({ banner }) => {
  return (
    <div className={"cm-portrait-banner"} {...metaDataElement(banner.metadata?.root)}>
      {banner.picture && (
        <div className={`cm-portrait-banner__picture`} {...metaDataProperty(banner.metadata?.picture)}>
          <PortraitResponsiveImage picture={banner.picture} />
        </div>
      )}
      <div className={`cm-portrait-banner__caption`}>
        <BannerCaption {...banner} />
        {banner.targets && <CTA targets={banner.targets} additionalClass={`cm-portrait-banner__cta`} />}
      </div>
    </div>
  );
};

export default PortraitBanner;
