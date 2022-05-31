import React from "react";

import { Redirect } from "react-router-dom";
import { ExternalProduct } from "@coremedia-labs/graphql-layer";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { getLink } from "../../../utils/Link/LinkUtils";
import { useSiteContextState } from "../../../context/SiteContextProvider";

const ExternalProductAsPreview: React.FC<IncludeProps<ExternalProduct>> = ({ self }) => {
  const { rootSegment } = useSiteContextState();
  return <Redirect to={getLink(self, rootSegment).linkTarget || ""} />;
};

export default ExternalProductAsPreview;
