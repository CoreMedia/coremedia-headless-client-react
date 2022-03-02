import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { CMProduct } from "@coremedia-labs/graphql-layer";
import LeftRightBanner from "../LeftRightBanner";
import { Banner } from "../../../models/Banner/Banner";
import { initializeCMProduct } from "../../../models/Banner/CMProduct";

const CMProductAsLeftRightBanner: React.FC<IncludeProps<CMProduct>> = ({ self }) => {
  const banner: Banner = initializeCMProduct(self);
  return <LeftRightBanner banner={banner} />;
};

export default CMProductAsLeftRightBanner;
