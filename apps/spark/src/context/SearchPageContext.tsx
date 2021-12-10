import React, { createContext, MouseEventHandler } from "react";

export interface FacetValues {
  hitCount?: number;
  label: string;
  query: string;
  selected?: boolean;
}

export interface Facet {
  label: string;
  key: string;
  multiSelect?: boolean;
  values: FacetValues[];
}

export interface SearchPageContextData {
  query?: string;
  totalCount: number;
  availableFacets?: Array<Facet>;
  result: Array<any | null> | null;
  onLoadMore: MouseEventHandler;
}

const SearchPageContext = createContext<SearchPageContextData>({
  query: "",
  totalCount: 0,
  availableFacets: [],
  result: [],
  onLoadMore: () => {
    return;
  },
});

const SearchResultContextProvider: React.FC<SearchPageContextData> = ({
  query,
  totalCount,
  availableFacets,
  result,
  onLoadMore,
  children,
}) => {
  const contextValues: SearchPageContextData = {
    query: query,
    totalCount: totalCount,
    availableFacets: availableFacets,
    result: result,
    onLoadMore: onLoadMore,
  };

  return <SearchPageContext.Provider value={contextValues}>{children}</SearchPageContext.Provider>;
};

export const useSearchPageContextState = (): SearchPageContextData => {
  const context = React.useContext(SearchPageContext);
  if (context === undefined) {
    throw new Error("useSearchPageContextState must be used within a SearchPageContextProvider");
  }
  return context;
};

export default SearchResultContextProvider;
