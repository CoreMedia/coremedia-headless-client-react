import React from "react";
import { metaDataElement, metaDataProperty } from "../../utils/Preview/MetaData";
import HeroResponsiveImage from "./HeroResponsiveImage";
import OverlayWithCtas from "../Overlay/OverlayWithCtas";
import ImageMapAreas from "../ImageMap/ImageMapAreas";
import { ImagemapBanner } from "../../models/Banner/ImagemapBanner";
import BannerCaption from "../Caption/BannerCaption";
import CTA from "../CTA/CTA";

interface Props {
  banner: ImagemapBanner;
}

const HeroImageMap: React.FC<Props> = ({ banner }) => {
  const teaserBlockClass = "cm-hero-banner";
  return (
    <div className={teaserBlockClass} {...metaDataElement(banner.metadata?.root)}>
      {banner.picture && (
        <div className={`cm-hero-banner__picture cm-imagemap`} {...metaDataProperty(banner.metadata?.picture)}>
          <div className={"cm-imagemap__wrapper"}>
            <HeroResponsiveImage picture={banner.picture} />
            <ImageMapAreas {...banner} cropName={"landscape_ratio8x3"} />
          </div>
        </div>
      )}

      {banner.overlayRequired && <OverlayWithCtas {...banner} />}
      {!banner.overlayRequired && (
        <div className={`${teaserBlockClass}__caption`}>
          <BannerCaption {...banner} />
          {banner.targets && <CTA targets={banner.targets} additionalClass={`${teaserBlockClass}__cta`} />}
        </div>
      )}
    </div>
  );
};

export default HeroImageMap;
