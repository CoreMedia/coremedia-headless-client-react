import React, { createContext, useReducer } from "react";
import { SortFieldWithOrder } from "@coremedia-labs/graphql-layer";

export interface SearchFacet {
  facetCategory: string;
  facetLabel: string;
  facetQuery: string;
}

export interface SearchStateContextData {
  selectedFacets: Array<SearchFacet>;
  sortField: string | null;
  sortFields: Array<SearchSortField>;
  query?: string;
  types?: Array<string>;
  limit: number;
}

export interface SearchStateContextDataAndFunctions extends SearchStateContextData {
  addFacet: (payload: SearchFacet) => void;
  removeFacet: (payload: SearchFacet) => void;
  removeFacets: (payload: string) => void;
  setSortField: (payload: string | null) => void;
  setQuery: (payload: string) => void;
  setTypes: (payload: Array<string>) => void;
  setLimit: (payload: number) => void;
}

export enum SearchStateActionTypes {
  ADD_FACET = "ADD_FACET",
  REMOVE_FACET = "REMOVE_FACET",
  REMOVE_FACETS = "REMOVE_FACETS",
  SET_SORT_FIELD = "SET_SORT_FIELD",
  SET_QUERY = "SET_QUERY",
  SET_TYPES = "SET_TYPES",
  SET_LIMIT = "SET_LIMIT",
}

type SearchStateAction = {
  type: SearchStateActionTypes;
  payload?: any;
};

export interface SearchSortField {
  label: string;
  value: string | null;
}

const SearchStateContext = createContext<SearchStateContextDataAndFunctions>({
  addFacet(): void {
    return;
  },
  removeFacet(): void {
    return;
  },
  removeFacets(): void {
    return;
  },
  setSortField(): void {
    return;
  },
  setQuery(): void {
    return;
  },
  setTypes(): void {
    return;
  },
  setLimit(): void {
    return;
  },
  selectedFacets: [],
  sortField: null,
  sortFields: [],
  types: [],
  limit: 5,
  query: "",
});

export const SearchStateReducer = (
  state: SearchStateContextData,
  action: SearchStateAction
): SearchStateContextData => {
  switch (action.type) {
    case SearchStateActionTypes.ADD_FACET:
      if (action.payload) {
        const facets = [...state.selectedFacets];
        if (
          action.payload &&
          !facets.find(
            (item: SearchFacet) =>
              item.facetCategory === action.payload.facetCategory && item.facetQuery === action.payload.facetQuery
          )
        ) {
          facets.push(action.payload);
        }
        return {
          ...state,
          selectedFacets: facets,
        };
      }
      break;
    case SearchStateActionTypes.REMOVE_FACET:
      if (action.payload) {
        const facetsAfterRemove = [
          ...state.selectedFacets.filter((item) => {
            return !(
              item.facetCategory === action.payload.facetCategory && item.facetQuery === action.payload.facetQuery
            );
          }),
        ];
        return {
          ...state,
          selectedFacets: facetsAfterRemove,
        };
      }
      break;
    case SearchStateActionTypes.REMOVE_FACETS:
      if (action.payload) {
        const facetsAfterRemoval = [...state.selectedFacets.filter((item) => item.facetCategory !== action.payload)];
        return {
          ...state,
          selectedFacets: facetsAfterRemoval,
        };
      }
      break;
    case SearchStateActionTypes.SET_SORT_FIELD:
      return {
        ...state,
        sortField: action.payload,
      };
    case SearchStateActionTypes.SET_QUERY:
      return {
        ...state,
        query: action.payload,
      };
    case SearchStateActionTypes.SET_TYPES:
      if (action.payload) {
        return {
          ...state,
          types: action.payload,
        };
      }
      break;
    case SearchStateActionTypes.SET_LIMIT:
      if (action.payload) {
        return {
          ...state,
          limit: action.payload,
        };
      }
      break;
    default:
      return state;
  }

  return initialState;
};

const initialState = { selectedFacets: [], sortField: null, query: "", sortFields: [], types: [], limit: 5 };

interface Props {
  sortField: string | null;
  query?: string;
  types?: Array<string>;
  limit?: number;
}

const SearchStateContextProvider: React.FC<Props> = ({
  sortField,
  query,
  types = ["CMArticle"],
  limit = 5,
  children,
}) => {
  const sortFields: Array<SearchSortField> = [
    {
      label: "Relevance",
      value: null,
    },
    {
      label: "Display Date Asc",
      value: SortFieldWithOrder.ExternallyDisplayedDateAsc,
    },
    {
      label: "Display Date Desc",
      value: SortFieldWithOrder.ExternallyDisplayedDateDesc,
    },
    { label: "Creation Date Asc", value: SortFieldWithOrder.CreationDateAsc },
    {
      label: "Creation Date Desc",
      value: SortFieldWithOrder.CreationDateDesc,
    },
    {
      label: "Modification Date Asc",
      value: SortFieldWithOrder.ModificationDateAsc,
    },
    {
      label: "Modification Date Desc",
      value: SortFieldWithOrder.ModificationDateDesc,
    },
  ];

  const [state, dispatch] = useReducer(SearchStateReducer, {
    selectedFacets: [],
    sortField: sortField,
    sortFields: sortFields,
    query: query,
    types: types,
    limit: limit,
  });

  const addFacet = (payload: SearchFacet) => {
    dispatch({ type: SearchStateActionTypes.ADD_FACET, payload });
  };

  const removeFacet = (payload: SearchFacet) => {
    dispatch({ type: SearchStateActionTypes.REMOVE_FACET, payload });
  };

  const removeFacets = (payload: string) => {
    dispatch({ type: SearchStateActionTypes.REMOVE_FACETS, payload });
  };

  const setSortField = (payload: string | null) => {
    dispatch({ type: SearchStateActionTypes.SET_SORT_FIELD, payload });
  };

  const setQuery = (payload: string) => {
    dispatch({ type: SearchStateActionTypes.SET_QUERY, payload });
  };

  const setTypes = (payload: Array<string>) => {
    dispatch({ type: SearchStateActionTypes.SET_TYPES, payload });
  };

  const setLimit = (payload: number) => {
    dispatch({ type: SearchStateActionTypes.SET_LIMIT, payload });
  };

  const contextValues: SearchStateContextDataAndFunctions = {
    addFacet,
    removeFacet,
    removeFacets,
    setSortField,
    setQuery,
    setTypes,
    setLimit,
    ...state,
  };

  return <SearchStateContext.Provider value={contextValues}>{children}</SearchStateContext.Provider>;
};

export const useSearchStateContextState = (): SearchStateContextDataAndFunctions => {
  const context = React.useContext(SearchStateContext);
  if (context === undefined) {
    throw new Error("useSearchStateContextState must be used within a SearchStateContextProvider");
  }
  return context;
};

export default SearchStateContextProvider;
