import React, { createContext, MouseEventHandler } from "react";
import { Banner } from "../models/Banner/Banner";

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
  result?: Array<Banner> | null;
  onLoadMore: MouseEventHandler;
  isLoading: boolean;
}

const SearchPageContext = createContext<SearchPageContextData>({
  isLoading: false,
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
  isLoading,
  children,
}) => {
  const contextValues: SearchPageContextData = {
    isLoading: isLoading,
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
