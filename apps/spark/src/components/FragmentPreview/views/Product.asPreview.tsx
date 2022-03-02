import React from "react";

import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { DetailProduct } from "@coremedia-labs/graphql-layer";
import { getLink } from "../../../utils/Link/LinkUtils";
import { Redirect } from "react-router-dom";

const ProductAsPreview: React.FC<IncludeProps<DetailProduct>> = ({ self }) => {
  return <Redirect to={getLink(self).linkTarget || ""} />;
};

export default ProductAsPreview;
