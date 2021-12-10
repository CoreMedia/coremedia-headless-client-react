import React from "react";
import { useSearchPageContextState } from "../../../context/SearchPageContext";
import SearchFilter from "./SearchFilter";

const FacetFilters: React.FC = () => {
  const { availableFacets } = useSearchPageContextState();
  return (
    <>
      {availableFacets && availableFacets.length > 0 && (
        <div className="cm-search__filters">
          {availableFacets &&
            availableFacets.map((facet, index) => {
              return (
                <SearchFilter
                  key={index}
                  title={facet.label}
                  entries={facet.values.map((entry) => {
                    return { ...entry, count: entry.hitCount };
                  })}
                  filterType={facet.multiSelect ? "checkbox" : "text"}
                />
              );
            })}
        </div>
      )}
    </>
  );
};

export default FacetFilters;
