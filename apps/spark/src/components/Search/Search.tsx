import React from "react";
import SearchFilters from "./SearchFilters";
import SearchQuery from "./SearchQuery";
import SearchResult from "./SearchResult";
import { useSearchPageContextState } from "../../context/SearchPageContext";
import { useSearchStateContextState } from "../../context/SearchStateContext";

import "./Search.scss";

const Search: React.FC = () => {
  const { totalCount } = useSearchPageContextState();
  const { query } = useSearchStateContextState();

  return (
    <div className="cm-placement cm-placement--main ">
      <div className={"cm-search cm-search--results"}>
        <div className="cm-search__header">
          <h1 className="cm-search__headline">Search Results</h1>
          {query && (
            <div className="cm-search__status">
              Your search for <span>{query}</span> returned <b>{totalCount}</b> hits.
            </div>
          )}
        </div>
        <div className="cm-search__wrapper">
          <SearchQuery />
          <SearchFilters />
          <SearchResult />
        </div>
      </div>
    </div>
  );
};

export default Search;
