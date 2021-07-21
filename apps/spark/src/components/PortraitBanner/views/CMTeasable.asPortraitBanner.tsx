import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { Teasable } from "../../../queries/fragments/__generated__/Teasable";
import PortraitBanner from "../PortraitBanner";
import { Banner, initializeBanner } from "../../../models/Banner/Banner";

const CMTeasableAsPortraitBanner: React.FC<IncludeProps<Teasable>> = ({ self }) => {
  const banner: Banner = initializeBanner(self);
  return <PortraitBanner banner={banner} />;
};

export default CMTeasableAsPortraitBanner;
