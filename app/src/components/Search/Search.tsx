import React, { ChangeEventHandler, MouseEventHandler } from "react";
import { Dispatchable } from "../../utils/ViewDispatcher/Dispatchable";
import { SortFieldWithOrder } from "../../__generated__/globalTypes";
import SearchFilter from "./SearchFilter";
import SearchQuery from "./SearchQuery";
import SearchResult from "./SearchResult";
import "./Search.scss";

interface Props {
  numFound: number;
  result: (Dispatchable | null)[] | null;
  query?: string;
  onQueryChange?: ChangeEventHandler;
  onSortChange?: ChangeEventHandler;
  onLoadMore?: MouseEventHandler;
  sortFields: Array<{
    label: string;
    value: string;
  }>;

  sortField?: SortFieldWithOrder | null;
}

const Search: React.FC<Props> = ({
  result,
  numFound,
  query,
  onLoadMore,
  onQueryChange,
  onSortChange,
  sortField,
  sortFields,
}) => {
  return (
    <div className="cm-placement cm-placement--main ">
      <div className={"cm-search cm-search--results"}>
        <div className="cm-search__header">
          <h1 className="cm-search__headline">Search Results</h1>
          {query && (
            <div className="cm-search__status">
              Your search for <span>{query}</span> returned <b>{numFound}</b> hits.
            </div>
          )}
        </div>
        <div className="cm-search__wrapper">
          <SearchQuery query={query} onQueryChange={onQueryChange} />
          <SearchFilter sortFields={sortFields} sortField={sortField} onSortChange={onSortChange} />
          <SearchResult numFound={numFound} result={result} onLoadMore={onLoadMore} />
        </div>
      </div>
    </div>
  );
};

export default Search;
