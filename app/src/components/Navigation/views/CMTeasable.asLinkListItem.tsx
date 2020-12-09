import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { Teasable } from "../../../queries/fragments/__generated__/Teasable";
import NavigatioItemWithPicture from "../NavigationItemWithPicture";
import { initializeAndConvertParams } from "../NavigationItem";
import { useSiteContextState } from "../../../context/SiteContextProvider";
import { initializeNavigationFromTeasable } from "../../../models/Navigation/Navigation";

const CMTeasableAsLinkListItem: React.FC<IncludeProps<Teasable>> = ({ self, params }) => {
  const { rootSegment } = useSiteContextState();
  return (
    <NavigatioItemWithPicture
      {...initializeNavigationFromTeasable(self, rootSegment)}
      {...initializeAndConvertParams(params)}
    />
  );
};

export default CMTeasableAsLinkListItem;
