import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { Teasable } from "@coremedia-labs/graphql-layer";
import HeroBanner from "../HeroBanner";
import { Banner, initializeBanner } from "../../../models/Banner/Banner";

const CMTeasableAsHeroBanner: React.FC<IncludeProps<Teasable>> = ({ self }) => {
  const banner: Banner = initializeBanner(self);
  return <HeroBanner banner={banner} />;
};
export default CMTeasableAsHeroBanner;
