import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { Category } from "../../../queries/fragments/Category";
import NavigationItemWithItems from "../NavigationItemWithItems";
import { initializeAndConvertParams } from "../NavigationItem";
import { useSiteContextState } from "../../../context/SiteContextProvider";
import { initializeNavigationFromCategory } from "../../../models/Navigation/Navigation";

const CategoryAsLinkListItem: React.FC<IncludeProps<Category>> = ({ self, params }) => {
  const { rootSegment } = useSiteContextState();
  return (
    <NavigationItemWithItems
      {...initializeNavigationFromCategory(self, rootSegment)}
      {...initializeAndConvertParams(params)}
    />
  );
};

export default CategoryAsLinkListItem;
