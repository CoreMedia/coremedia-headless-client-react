import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { ExternalNavigation } from "../../../queries/fragments/ExternalNavigation";
import NavigationItemWithItems from "../NavigationItemWithItems";
import { initializeAndConvertParams } from "../NavigationItem";
import { useSiteContextState } from "../../../context/SiteContextProvider";
import { initializeNavigationFromExternalNavigation } from "../../../models/Navigation/Navigation";

const CMExternalChannelAsLinkListItem: React.FC<IncludeProps<ExternalNavigation>> = ({ self, params }) => {
  const { rootSegment } = useSiteContextState();
  return (
    <NavigationItemWithItems
      {...initializeNavigationFromExternalNavigation(self, rootSegment)}
      {...initializeAndConvertParams(params)}
    />
  );
};

export default CMExternalChannelAsLinkListItem;
