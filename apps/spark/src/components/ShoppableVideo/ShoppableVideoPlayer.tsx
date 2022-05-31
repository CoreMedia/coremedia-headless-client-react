import React, { FC } from "react";
import VideoPlayer, { Props } from "../Media/VideoPlayer";
import { useShoppableVideoContextState } from "./ShoppableVideoContext";

const ShoppableVideoPlayer: FC<Props> = (props) => {
  const { setTimestamp } = useShoppableVideoContextState();
  return <VideoPlayer {...props} setTimestamp={setTimestamp} />;
};

export default ShoppableVideoPlayer;
