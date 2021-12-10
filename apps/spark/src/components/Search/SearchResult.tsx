import React from "react";
import Include from "../../utils/ViewDispatcher/Include";
import { useSearchPageContextState } from "../../context/SearchPageContext";

const SearchResult: React.FC = () => {
  const { availableFacets, result, totalCount, onLoadMore } = useSearchPageContextState();
  return (
    <div
      className={
        availableFacets && availableFacets.length > 0
          ? "cm-search__results"
          : "cm-search__results cm-search__results-without-filters"
      }
    >
      {result &&
        result.map((item, index) => {
          return item && <Include self={item} key={index} view={"asSearchResult"} />;
        })}
      {result && result.length < totalCount && (
        <button className="cm-search__more" onClick={onLoadMore}>
          Load More
        </button>
      )}
    </div>
  );
};

export default SearchResult;
