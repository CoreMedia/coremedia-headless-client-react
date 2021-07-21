import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { Video } from "../../../queries/fragments/__generated__/Video";
import { initializeShoppableVideoBanner, ShoppableVideoBanner } from "../../../models/Banner/VideoBanner";
import ShoppableHeroVideo from "../ShoppableHeroVideo";

const CMVideoAsHeroBannerShoppable: React.FC<IncludeProps<Video>> = ({ self }) => {
  const banner: ShoppableVideoBanner = initializeShoppableVideoBanner(self);
  return <ShoppableHeroVideo banner={banner} />;
};

export default CMVideoAsHeroBannerShoppable;
