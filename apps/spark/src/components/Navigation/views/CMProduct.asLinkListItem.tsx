import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { CMProduct } from "../../../queries/fragments/__generated__/CMProduct";
import NavigatioItemWithPicture from "../NavigationItemWithPicture";
import { initializeAndConvertParams } from "../NavigationItem";
import { useSiteContextState } from "../../../context/SiteContextProvider";
import { initializeNavigationFromCMProduct } from "../../../models/Navigation/Navigation";

const CMTeasableAsLinkListItem: React.FC<IncludeProps<CMProduct>> = ({ self, params }) => {
  const { rootSegment } = useSiteContextState();
  return (
    <NavigatioItemWithPicture
      {...initializeNavigationFromCMProduct(self, rootSegment)}
      {...initializeAndConvertParams(params)}
    />
  );
};

export default CMTeasableAsLinkListItem;
