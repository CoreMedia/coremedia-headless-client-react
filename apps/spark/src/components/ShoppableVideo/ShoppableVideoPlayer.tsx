import React, { FC } from "react";
import { metaDataElement, metaDataProperty } from "../../utils/Preview/MetaData";
import { VideoBanner } from "../../models/Banner/VideoBanner";
import ReactPlayer from "react-player";
import { useShoppableVideoContextState } from "../ShoppableVideo/ShoppableVideoContext";

const initializePlayerSettings = (
  controls: boolean,
  autoPlay: boolean,
  muted: boolean,
  loop: boolean,
  settings?: { autoplay: boolean; hideControls: boolean; loop: boolean; muted: boolean }
) => {
  return {
    controls: settings && settings.hideControls !== undefined ? !settings.hideControls : controls,
    playing: settings && settings.autoplay !== undefined ? settings.autoplay : autoPlay,
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

const ShoppableVideoPlayer: FC<Props> = ({
  banner,
  layoutClassName = "",
  controls = true,
  autoPlay = false,
  muted = true,
  loop = false,
}) => {
  const { setTimestamp } = useShoppableVideoContextState();
  return (
    <div className={`cm-image-box ${layoutClassName}`} {...metaDataElement(banner.metadata?.root)}>
      {banner.videoUrl && (
        <ReactPlayer
          url={banner.videoUrl || ""}
          className="cm-video"
          width={"100%"}
          height={"100%"}
          {...(setTimestamp && { onProgress: setTimestamp })}
          {...initializePlayerSettings(controls, autoPlay, muted, loop, banner.playerSettings)}
          {...metaDataProperty("properties.data")}
        />
      )}
    </div>
  );
};

export default ShoppableVideoPlayer;
