import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { ExternalLink } from "@coremedia-labs/graphql-layer";
import PortraitBanner from "../PortraitBanner";
import { Banner } from "../../../models/Banner/Banner";
import { initializeExternalLink } from "../../../models/Banner/ExternalLink";

const CMExternalLinkAsPortraitBanner: React.FC<IncludeProps<ExternalLink>> = ({ self }) => {
  const banner: Banner = initializeExternalLink(self);
  return <PortraitBanner banner={banner} />;
};
export default CMExternalLinkAsPortraitBanner;
