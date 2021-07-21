import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { Teasable } from "../../../queries/fragments/__generated__/Teasable";
import LandscapeBanner from "../LandscapeBanner";
import { Banner, initializeBanner } from "../../../models/Banner/Banner";

const CMTeasableAsLandscapeBanner: React.FC<IncludeProps<Teasable>> = ({ self }) => {
  const banner: Banner = initializeBanner(self);
  return <LandscapeBanner banner={banner} />;
};

export default CMTeasableAsLandscapeBanner;
