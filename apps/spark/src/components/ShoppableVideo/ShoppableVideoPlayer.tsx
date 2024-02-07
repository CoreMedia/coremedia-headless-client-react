import React, { FC, useEffect } from "react";
import VideoPlayer, { Props } from "../Media/VideoPlayer";
import { useShoppableVideoContextState } from "./ShoppableVideoContext";

const ShoppableVideoPlayer: FC<Props> = (props) => {
  const { playing, setTimestamp, play, pause } = useShoppableVideoContextState();

  useEffect(() => {
    props.video?.playerSettings?.autoplay ? play() : pause();
  }, []);

  return <VideoPlayer {...props} playing={playing} setTimestamp={setTimestamp} />;
};

export default ShoppableVideoPlayer;
