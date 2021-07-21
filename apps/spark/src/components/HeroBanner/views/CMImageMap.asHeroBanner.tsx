import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import HeroImageMap from "../HeroImageMap";
import { ImageMap } from "../../../queries/fragments/__generated__/ImageMap";
import { ImagemapBanner, initializeImagemapBanner } from "../../../models/Banner/ImagemapBanner";

const CMImageMapAsHeroBanner: React.FC<IncludeProps<ImageMap>> = ({ self }) => {
  const banner: ImagemapBanner = initializeImagemapBanner(self);
  return <HeroImageMap banner={banner} />;
};

export default CMImageMapAsHeroBanner;
