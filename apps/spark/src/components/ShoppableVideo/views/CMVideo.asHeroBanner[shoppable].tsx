import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { Video } from "../../../queries/fragments/__generated__/Video";
import { useSiteContextState } from "../../../context/SiteContextProvider";
import { initializeShoppableVideoBanner, ShoppableVideoBanner } from "../../../models/Banner/VideoBanner";
import ShoppableHeroVideo from "../ShoppableHeroVideo";

const CMVideoAsHeroBannerShoppable: React.FC<IncludeProps<Video>> = ({ self }) => {
  const { rootSegment } = useSiteContextState();
  const banner: ShoppableVideoBanner = initializeShoppableVideoBanner(self, rootSegment);
  return <ShoppableHeroVideo banner={banner} />;
};

export default CMVideoAsHeroBannerShoppable;
