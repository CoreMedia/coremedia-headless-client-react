import React, { createContext } from "react";
import { Category } from "@coremedia-labs/graphql-layer";

export interface CategoryPageContextData {
  categoryName?: string | null;
  categoryChildren?: Array<Category>;
}

const CategoryPageContext = createContext<CategoryPageContextData>({
  categoryName: "",
  categoryChildren: [],
});

const CategoryPageContextProvider: React.FC<CategoryPageContextData> = ({
  categoryName,
  children,
  categoryChildren,
}) => {
  const contextValues: CategoryPageContextData = {
    categoryName: categoryName,
    categoryChildren: categoryChildren,
  };

  return <CategoryPageContext.Provider value={contextValues}>{children}</CategoryPageContext.Provider>;
};

export const useCategoryPageContextState = (): CategoryPageContextData => {
  const context = React.useContext(CategoryPageContext);
  if (context === undefined) {
    throw new Error("useCategoryPageContextState must be used within a CategoryPageContextProvider");
  }
  return context;
};

export default CategoryPageContextProvider;
