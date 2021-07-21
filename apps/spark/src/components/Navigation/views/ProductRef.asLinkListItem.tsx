import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import NavigationItemWithPicture from "../NavigationItemWithPicture";
import { initializeAndConvertParams } from "../NavigationItem";
import { initializeNavigationFromProduct } from "../../../models/Navigation/Navigation";
import { ProductRef } from "../../../queries/fragments/__generated__/ProductRef";

const CMTeasableAsLinkListItem: React.FC<IncludeProps<ProductRef>> = ({ self, params }) => {
  return (
    self.product && (
      <NavigationItemWithPicture
        {...initializeNavigationFromProduct(self.product)}
        {...initializeAndConvertParams(params)}
      />
    )
  );
};

export default CMTeasableAsLinkListItem;
