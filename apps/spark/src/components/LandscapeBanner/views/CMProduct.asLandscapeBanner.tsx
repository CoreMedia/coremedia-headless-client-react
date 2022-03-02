import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { CMProduct } from "@coremedia-labs/graphql-layer";
import LandscapeBanner from "../LandscapeBanner";
import { Banner } from "../../../models/Banner/Banner";
import { initializeCMProduct } from "../../../models/Banner/CMProduct";

const CMProductAsLandscapeBanner: React.FC<IncludeProps<CMProduct>> = ({ self }) => {
  const banner: Banner = initializeCMProduct(self);
  return <LandscapeBanner banner={banner} />;
};

export default CMProductAsLandscapeBanner;
