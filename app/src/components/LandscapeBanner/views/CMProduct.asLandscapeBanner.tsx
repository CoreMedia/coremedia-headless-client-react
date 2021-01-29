import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { CMProduct } from "../../../queries/fragments/__generated__/CMProduct";
import LandscapeBanner from "../LandscapeBanner";
import { useSiteContextState } from "../../../context/SiteContextProvider";
import { Banner } from "../../../models/Banner/Banner";
import { initializeCMProduct } from "../../../models/Banner/CMProduct";

const CMProductAsLandscapeBanner: React.FC<IncludeProps<CMProduct>> = ({ self }) => {
  const { rootSegment } = useSiteContextState();
  const banner: Banner = initializeCMProduct(self, rootSegment);
  return <LandscapeBanner banner={banner} />;
};

export default CMProductAsLandscapeBanner;
