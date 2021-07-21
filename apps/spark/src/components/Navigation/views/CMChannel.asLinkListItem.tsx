import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { Navigation } from "../../../queries/fragments/Navigation";
import NavigationItemWithItems from "../NavigationItemWithItems";
import { initializeAndConvertParams } from "../NavigationItem";
import { initializeNavigationFromNavigation } from "../../../models/Navigation/Navigation";

const CMChannelAsLinkListItem: React.FC<IncludeProps<Navigation>> = ({ self, params }) => {
  return (
    <NavigationItemWithItems {...initializeNavigationFromNavigation(self)} {...initializeAndConvertParams(params)} />
  );
};

export default CMChannelAsLinkListItem;
