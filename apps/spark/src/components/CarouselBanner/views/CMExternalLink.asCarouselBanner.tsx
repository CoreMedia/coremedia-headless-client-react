import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { ExternalLink } from "../../../queries/fragments/__generated__/ExternalLink";
import CarouselBanner from "../CarouselBanner";
import { Banner } from "../../../models/Banner/Banner";
import { useSiteContextState } from "../../../context/SiteContextProvider";
import { initializeExternalLink } from "../../../models/Banner/ExternalLink";

const CMExternalLinkAsCarouselBanner: React.FC<IncludeProps<ExternalLink>> = ({ self }) => {
  const { rootSegment } = useSiteContextState();
  const banner: Banner = initializeExternalLink(self, rootSegment);
  return <CarouselBanner banner={banner} />;
};

export default CMExternalLinkAsCarouselBanner;
