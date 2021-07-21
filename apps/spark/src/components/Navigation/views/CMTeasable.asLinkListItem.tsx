import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { TeasableForNavigation as Teasable } from "../../../queries/fragments/navigation/__generated__/TeasableForNavigation";
import NavigationItemWithPicture from "../NavigationItemWithPicture";
import { initializeAndConvertParams } from "../NavigationItem";
import { initializeNavigationFromTeasable } from "../../../models/Navigation/Navigation";

const CMTeasableAsLinkListItem: React.FC<IncludeProps<Teasable>> = ({ self, params }) => {
  return (
    <NavigationItemWithPicture {...initializeNavigationFromTeasable(self)} {...initializeAndConvertParams(params)} />
  );
};

export default CMTeasableAsLinkListItem;
