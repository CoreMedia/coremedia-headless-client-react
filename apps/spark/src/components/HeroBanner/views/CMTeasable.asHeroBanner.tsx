import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { Teasable } from "../../../queries/fragments/__generated__/Teasable";
import HeroBanner from "../HeroBanner";
import { Banner, initializeBanner } from "../../../models/Banner/Banner";

const CMTeasableAsHeroBanner: React.FC<IncludeProps<Teasable>> = ({ self }) => {
  const banner: Banner = initializeBanner(self);
  return <HeroBanner banner={banner} />;
};
export default CMTeasableAsHeroBanner;
