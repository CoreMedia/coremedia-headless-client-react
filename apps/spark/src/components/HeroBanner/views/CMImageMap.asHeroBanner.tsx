import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import HeroImageMap from "../HeroImageMap";
import { ImageMap } from "@coremedia-labs/graphql-layer";
import { ImagemapBanner, initializeImagemapBanner } from "../../../models/Banner/ImagemapBanner";

const CMImageMapAsHeroBanner: React.FC<IncludeProps<ImageMap>> = ({ self }) => {
  const banner: ImagemapBanner = initializeImagemapBanner(self);
  return <HeroImageMap banner={banner} />;
};

export default CMImageMapAsHeroBanner;
