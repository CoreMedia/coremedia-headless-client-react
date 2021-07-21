import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { CMProduct } from "../../../queries/fragments/__generated__/CMProduct";
import PortraitBanner from "../PortraitBanner";
import { Banner } from "../../../models/Banner/Banner";
import { initializeCMProduct } from "../../../models/Banner/CMProduct";

const CMProductAsPortraitBanner: React.FC<IncludeProps<CMProduct>> = ({ self }) => {
  const banner: Banner = initializeCMProduct(self);
  return <PortraitBanner banner={banner} />;
};

export default CMProductAsPortraitBanner;
