import React from "react";

import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { Redirect } from "react-router-dom";
import { ExternalProduct } from "@coremedia-labs/graphql-layer";
import { getLink } from "../../../utils/Link/LinkUtils";

const ExternalProductAsPreview: React.FC<IncludeProps<ExternalProduct>> = ({ self }) => {
  return <Redirect to={getLink(self).linkTarget || ""} />;
};

export default ExternalProductAsPreview;
