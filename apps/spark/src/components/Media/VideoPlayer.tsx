import React, { FC } from "react";
import styled from "styled-components";
import ReactPlayer from "react-player";
import { SupportsVideo } from "../../models/Banner/VideoBanner";
import { metaDataElement, metaDataProperty } from "../../utils/Preview/MetaData";
import { ImageBox } from "./ResponsiveImage";

export const initializePlayerSettings = (
  controls: boolean,
  muted: boolean,
  loop: boolean,
  autoPlay: boolean,
  playing?: boolean,
  settings?: { autoplay: boolean; hideControls: boolean; loop: boolean; muted: boolean }
) => {
  if (playing == undefined && autoPlay) {
    playing = autoPlay;
  }
  return {
    controls: settings && settings.hideControls !== undefined ? !settings.hideControls : controls,
    playing: playing,
    muted: settings && settings.muted !== undefined ? settings.muted : muted,
    loop: settings && settings.loop !== undefined ? settings.loop : loop,
  };
};

export interface Props extends SupportsVideo {
  controls?: boolean;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  playing?: boolean;
  setTimestamp?: (payload: any) => void;
}

const StyledVideo = styled(ReactPlayer)`
  video {
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

const VideoPlayer: FC<Props> = ({
  video,
  controls = true,
  autoPlay = false,
  playing,
  muted = true,
  loop = false,
  setTimestamp,
  metadata,
}) => {
  return (
    <ImageBox {...metaDataElement(metadata?.root)}>
      {video && video.videoUrl && (
        <StyledVideo
          url={video.videoUrl}
          width={"100%"}
          height={"100%"}
          {...(setTimestamp && { onProgress: setTimestamp })}
          {...initializePlayerSettings(controls, autoPlay, muted, loop, playing, video.playerSettings)}
          {...metaDataProperty("properties.data")}
        />
      )}
    </ImageBox>
  );
};

export default VideoPlayer;
