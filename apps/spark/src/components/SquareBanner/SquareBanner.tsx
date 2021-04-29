import React from "react";
import { metaDataElement, metaDataProperty } from "../../utils/Preview/MetaData";
import OverlayWithCtas from "../Overlay/OverlayWithCtas";
import "./SquareBanner.scss";
import { Banner } from "../../models/Banner/Banner";
import BannerCaption from "../Caption/BannerCaption";
import CTA from "../CTA/CTA";
import SquareResponsiveImage from "./SquareResponsiveImage";

interface Props {
  banner: Banner;
}

const SquareBanner: React.FC<Props> = ({ banner }) => {
  return (
    <div className={`cm-square-banner`} {...metaDataElement(banner.metadata?.root)}>
      {banner.picture && (
        <div className={`cm-square-banner__picture`} {...metaDataProperty(banner.metadata?.picture)}>
          <SquareResponsiveImage picture={banner.picture} />
        </div>
      )}
      {banner.overlayRequired && <OverlayWithCtas {...banner} />}
      {!banner.overlayRequired && (
        <div className={`cm-square-banner__caption`}>
          <BannerCaption {...banner} />
          {banner.targets && <CTA targets={banner.targets} additionalClass={`cm-square-banner__cta`} />}
        </div>
      )}
    </div>
  );
};

export default SquareBanner;
