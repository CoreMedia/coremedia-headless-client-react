import React, { FC } from "react";
import { metaDataElement, metaDataProperty } from "../../utils/Preview/MetaData";
import { VideoBanner } from "../../models/Banner/VideoBanner";

const initializePlayerSettings = (
  controls: boolean,
  autoPlay: boolean,
  muted: boolean,
  loop: boolean,
  settings?: { autoplay: boolean; hideControls: boolean; loop: boolean; muted: boolean }
) => {
  return {
    controls: settings && settings.hideControls !== undefined ? !settings.hideControls : controls,
    autoPlay: settings && settings.autoplay !== undefined ? settings.autoplay : autoPlay,
    muted: settings && settings.muted !== undefined ? settings.muted : muted,
    loop: settings && settings.loop !== undefined ? settings.loop : loop,
  };
};

interface Props {
  banner: VideoBanner;
  layoutClassName?: string;
  controls?: boolean;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
}

const VideoPlayer: FC<Props> = ({
  banner,
  layoutClassName = "",
  controls = true,
  autoPlay = false,
  muted = true,
  loop = false,
}) => {
  return (
    <div className={`cm-image-box ${layoutClassName}`} {...metaDataElement(banner.metadata?.root)}>
      {banner.videoUrl && (
        <>
          <video
            src={banner.videoUrl}
            className="cm-video"
            {...initializePlayerSettings(controls, autoPlay, muted, loop, banner.playerSettings)}
            {...metaDataProperty("properties.data")}
          >
            No video available.
          </video>
        </>
      )}
    </div>
  );
};

export default VideoPlayer;
