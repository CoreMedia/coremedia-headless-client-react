import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { Teasable } from "../../../queries/fragments/__generated__/Teasable";
import HeroBanner from "../HeroBanner";
import { Banner, initializeBanner } from "../../../models/Banner/Banner";
import { useSiteContextState } from "../../../context/SiteContextProvider";

const CMTeasableAsHeroBanner: React.FC<IncludeProps<Teasable>> = ({ self }) => {
  const { rootSegment } = useSiteContextState();
  const banner: Banner = initializeBanner(self, rootSegment);
  return <HeroBanner banner={banner} />;
};
export default CMTeasableAsHeroBanner;
