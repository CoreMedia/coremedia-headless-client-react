import React from "react";

import { DetailProduct } from "@coremedia-labs/graphql-layer";
import { Redirect } from "react-router-dom";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { getLink } from "../../../utils/Link/LinkUtils";
import { useSiteContextState } from "../../../context/SiteContextProvider";

const ProductAsPreview: React.FC<IncludeProps<DetailProduct>> = ({ self }) => {
  const { rootSegment } = useSiteContextState();
  return <Redirect to={getLink(self, rootSegment).linkTarget || ""} />;
};

export default ProductAsPreview;
