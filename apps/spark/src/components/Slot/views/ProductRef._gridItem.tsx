import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import Include from "../../../utils/ViewDispatcher/Include";
import { ProductRef } from "../../../queries/fragments/__generated__/ProductRef";

const ProductRefGridItem: React.FC<IncludeProps<ProductRef>> = ({ self, params }) => {
  return (
    <div className={`cm-slot__item`}>
      {params && self.product && <Include self={self.product} view={(params.includeView as string) || ""} />}
    </div>
  );
};

export default ProductRefGridItem;
