import React, { MouseEventHandler } from "react";
import Include from "../../utils/ViewDispatcher/Include";
import { Dispatchable } from "../../utils/ViewDispatcher/Dispatchable";

interface Props {
  numFound: number;
  result: (Dispatchable | null)[] | null;
  onLoadMore?: MouseEventHandler;
}

const SearchResult: React.FC<Props> = ({ numFound, result, onLoadMore }) => {
  return (
    <div id={"cm-search-results"} className={"cm-search__results"}>
      {result &&
        result.map((item, index) => {
          return item && <Include self={item} key={index} view={"asSearchResult"} />;
        })}
      {result && result.length < numFound && (
        <button className="cm-search__more" onClick={onLoadMore}>
          Load More
        </button>
      )}
    </div>
  );
};

export default SearchResult;
