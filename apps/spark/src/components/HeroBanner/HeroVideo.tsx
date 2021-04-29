import React from "react";
import { metaDataElement } from "../../utils/Preview/MetaData";
import OverlayWithCtas from "../Overlay/OverlayWithCtas";
import VideoPlayer from "../Media/VideoPlayer";
import { VideoBanner } from "../../models/Banner/VideoBanner";
import BannerCaption from "../Caption/BannerCaption";
import CTA from "../CTA/CTA";

interface Props {
  banner: VideoBanner;
}

const HeroVideo: React.FC<Props> = ({ banner }) => {
  const teaserBlockClass = "cm-hero-banner";
  return (
    <div className={teaserBlockClass} {...metaDataElement(banner.metadata?.root)}>
      <VideoPlayer
        banner={banner}
        layoutClassName={"cm-image-box"}
        controls={false}
        autoPlay={true}
        muted={true}
        loop={true}
      />
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

export default HeroVideo;
