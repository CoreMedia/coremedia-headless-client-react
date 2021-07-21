import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { Category } from "../../../queries/fragments/Category";
import NavigationItemWithItems from "../NavigationItemWithItems";
import { initializeAndConvertParams } from "../NavigationItem";
import { initializeNavigationFromCategory } from "../../../models/Navigation/Navigation";

const CategoryAsLinkListItem: React.FC<IncludeProps<Category>> = ({ self, params }) => {
  return (
    <NavigationItemWithItems {...initializeNavigationFromCategory(self)} {...initializeAndConvertParams(params)} />
  );
};

export default CategoryAsLinkListItem;
