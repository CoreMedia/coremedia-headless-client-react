import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import HeroVideo from "../HeroVideo";
import { Video } from "../../../queries/fragments/__generated__/Video";
import { useSiteContextState } from "../../../context/SiteContextProvider";
import { initializeVideoBanner, VideoBanner } from "../../../models/Banner/VideoBanner";

const CMVideoAsHeroBanner: React.FC<IncludeProps<Video>> = ({ self }) => {
  const { rootSegment } = useSiteContextState();
  const banner: VideoBanner = initializeVideoBanner(self, rootSegment);
  return <HeroVideo banner={banner} />;
};

export default CMVideoAsHeroBanner;
