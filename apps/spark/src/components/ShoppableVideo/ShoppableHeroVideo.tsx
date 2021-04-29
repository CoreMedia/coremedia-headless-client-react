import React from "react";
import { metaDataElement } from "../../utils/Preview/MetaData";
import OverlayWithCtas from "../Overlay/OverlayWithCtas";
import { ShoppableVideoBanner } from "../../models/Banner/VideoBanner";
import BannerCaption from "../Caption/BannerCaption";
import CTA from "../CTA/CTA";
import "./Shoppable.scss";
import { Settings } from "../Slider/Slider";
import TimelineEntry from "./TimelineEntry";
import ShoppableVideoContextProvider from "./ShoppableVideoContext";
import ShoppableSlider from "./ShoppableSlider";
import ShoppableVideoPlayer from "./ShoppableVideoPlayer";

interface Props {
  banner: ShoppableVideoBanner;
}
const sliderConfig: Settings = {
  slidesToShow: 10,
  infinite: false,
  arrows: false,
  responsive: [
    { breakpoint: 1200, settings: { slidesToShow: 4 } },
    {
      breakpoint: 420,
      settings: {
        centerMode: true,
        centerPadding: "0px",
        variableWidth: true,
      },
    },
  ],
};

const ShoppableHeroVideo: React.FC<Props> = ({ banner }) => {
  const teaserBlockClass = "cm-shoppable cm-hero-banner";

  return (
    <ShoppableVideoContextProvider timeline={banner.timeline}>
      <div className={"cm-shoppable cm-shoppable__horizontal"}>
        <div className={teaserBlockClass} {...metaDataElement(banner.metadata?.root)}>
          <ShoppableVideoPlayer
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
        {banner.timeline && (
          <ShoppableSlider config={sliderConfig}>
            {banner.timeline &&
              banner.timeline.map((entry, index) => {
                return <TimelineEntry key={index} {...entry} />;
              })}
          </ShoppableSlider>
        )}
      </div>
    </ShoppableVideoContextProvider>
  );
};

export default ShoppableHeroVideo;
