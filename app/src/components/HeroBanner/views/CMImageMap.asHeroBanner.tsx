import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import HeroImageMap from "../HeroImageMap";
import { ImageMap } from "../../../queries/fragments/__generated__/ImageMap";
import { useSiteContextState } from "../../../context/SiteContextProvider";
import { ImagemapBanner, initializeImagemapBanner } from "../../../models/Banner/ImagemapBanner";

const CMImageMapAsHeroBanner: React.FC<IncludeProps<ImageMap>> = ({ self }) => {
  const { rootSegment } = useSiteContextState();
  const banner: ImagemapBanner = initializeImagemapBanner(self, rootSegment);
  return <HeroImageMap banner={banner} />;
};

export default CMImageMapAsHeroBanner;
