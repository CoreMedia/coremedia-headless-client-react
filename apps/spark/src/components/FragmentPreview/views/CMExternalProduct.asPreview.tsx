import React from "react";

import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { Redirect } from "react-router-dom";
import { ExternalProduct } from "../../../queries/fragments/__generated__/ExternalProduct";
import { getLink } from "../../../utils/Link/LinkUtils";

const ExternalProductAsPreview: React.FC<IncludeProps<ExternalProduct>> = ({ self }) => {
  return <Redirect to={getLink(self)} />;
};

export default ExternalProductAsPreview;
