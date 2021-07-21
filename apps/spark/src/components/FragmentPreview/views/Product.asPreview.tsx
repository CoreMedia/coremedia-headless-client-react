import React from "react";

import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { DetailProduct } from "../../../queries/fragments/__generated__/DetailProduct";
import { createProductHref } from "../../../utils/Link/LinkUtils";
import { Redirect } from "react-router-dom";

const ProductAsPreview: React.FC<IncludeProps<DetailProduct>> = ({ self }) => {
  return <Redirect to={createProductHref(self) || ""} />;
};

export default ProductAsPreview;
