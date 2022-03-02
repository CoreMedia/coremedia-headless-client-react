import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { ExternalLink } from "@coremedia-labs/graphql-layer";
import LeftRightBanner from "../LeftRightBanner";
import { Banner } from "../../../models/Banner/Banner";
import { initializeExternalLink } from "../../../models/Banner/ExternalLink";

const CMExternalLinkAsLeftRightBanner: React.FC<IncludeProps<ExternalLink>> = ({ self }) => {
  const banner: Banner = initializeExternalLink(self);
  return <LeftRightBanner banner={banner} />;
};
export default CMExternalLinkAsLeftRightBanner;
