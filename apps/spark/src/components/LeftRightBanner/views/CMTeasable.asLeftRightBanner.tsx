import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { Teasable } from "../../../queries/fragments/__generated__/Teasable";
import LeftRightBanner from "../LeftRightBanner";
import { Banner, initializeBanner } from "../../../models/Banner/Banner";

const CMTeasableAsLeftRightBanner: React.FC<IncludeProps<Teasable>> = ({ self }) => {
  const banner: Banner = initializeBanner(self);
  return <LeftRightBanner banner={banner} />;
};

export default CMTeasableAsLeftRightBanner;
