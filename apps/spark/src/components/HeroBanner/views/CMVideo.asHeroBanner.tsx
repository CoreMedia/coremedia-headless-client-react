import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import HeroVideo from "../HeroVideo";
import { Video } from "../../../queries/fragments/__generated__/Video";
import { initializeVideoBanner, VideoBanner } from "../../../models/Banner/VideoBanner";

const CMVideoAsHeroBanner: React.FC<IncludeProps<Video>> = ({ self }) => {
  const banner: VideoBanner = initializeVideoBanner(self);
  return <HeroVideo banner={banner} />;
};

export default CMVideoAsHeroBanner;
