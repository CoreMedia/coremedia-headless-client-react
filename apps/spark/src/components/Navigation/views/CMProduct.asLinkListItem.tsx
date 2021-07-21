import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { CMProductForNavigation as CMProduct } from "../../../queries/fragments/navigation/__generated__/CMProductForNavigation";
import NavigationItemWithPicture from "../NavigationItemWithPicture";
import { initializeAndConvertParams } from "../NavigationItem";
import { initializeNavigationFromCMProduct } from "../../../models/Navigation/Navigation";

const CMTeasableAsLinkListItem: React.FC<IncludeProps<CMProduct>> = ({ self, params }) => {
  return (
    <NavigationItemWithPicture {...initializeNavigationFromCMProduct(self)} {...initializeAndConvertParams(params)} />
  );
};

export default CMTeasableAsLinkListItem;
