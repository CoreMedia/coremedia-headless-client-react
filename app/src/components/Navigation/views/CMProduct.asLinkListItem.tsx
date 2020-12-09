import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import NavigatioItemWithPicture from "../NavigationItemWithPicture";
import { initializeAndConvertParams } from "../NavigationItem";
import { CMProduct } from "../../../queries/fragments/__generated__/CMProduct";
import { useSiteContextState } from "../../../context/SiteContextProvider";
import { initializeNavigationFromTeasable } from "../../../models/Navigation/Navigation";

const CMTeasableAsLinkListItem: React.FC<IncludeProps<CMProduct>> = ({ self, params }) => {
  const { rootSegment } = useSiteContextState();
  return (
    <NavigatioItemWithPicture
      {...initializeNavigationFromTeasable(self, rootSegment)}
      {...initializeAndConvertParams(params)}
    />
  );
};

export default CMTeasableAsLinkListItem;
