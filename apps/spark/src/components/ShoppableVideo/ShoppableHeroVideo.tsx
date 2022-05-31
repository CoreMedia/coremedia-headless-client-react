import React from "react";
import styled from "styled-components";
import { Banner } from "../../models/Banner/Banner";
import { metaDataElement } from "../../utils/Preview/MetaData";
import CTA from "../CTA/CTA";
import BannerCaption from "../Caption/BannerCaption";
import OverlayWithCtas from "../Overlay/OverlayWithCtas";
import { Settings } from "../Slider/Slider";
import { ImageBox } from "../Media/ResponsiveImage";
import ShoppableSlider from "./ShoppableSlider";
import ShoppableVideoContextProvider from "./ShoppableVideoContext";
import ShoppableVideoPlayer from "./ShoppableVideoPlayer";
import TimelineEntry from "./TimelineEntry";

interface Props {
  banner: Banner;
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

const StyledShoppableVideo = styled.div`
  position: relative;

  ${ImageBox} {
    --aspect-ratio: 16 * 9;
  }
`;

const ShoppableHeroVideo: React.FC<Props> = ({ banner }) => {
  return (
    <ShoppableVideoContextProvider timeline={banner.timeline}>
      <div>
        <StyledShoppableVideo {...metaDataElement(banner.metadata?.root)}>
          <ShoppableVideoPlayer {...banner} controls={false} autoPlay={true} muted={true} loop={true} />
          {banner.overlayRequired && <OverlayWithCtas {...banner} />}
          {!banner.overlayRequired && (
            <div>
              <BannerCaption {...banner} />
              {banner.targets && <CTA targets={banner.targets} />}
            </div>
          )}
        </StyledShoppableVideo>
        {banner.timeline && (
          <ShoppableSlider config={sliderConfig}>
            {banner.timeline &&
              banner.timeline.map((item, index) => {
                return (
                  <TimelineEntry
                    key={index}
                    entry={item.entry}
                    startTime={item.startTime}
                    endTime={item.endTime}
                    activeIdForBlock={item.activeIdForBlock}
                  />
                );
              })}
          </ShoppableSlider>
        )}
      </div>
    </ShoppableVideoContextProvider>
  );
};

export default ShoppableHeroVideo;
