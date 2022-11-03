import React from "react";
import styled from "styled-components";
import { useSearchPageContextState } from "../../../context/SearchPageContext";
import SearchFilter from "./SearchFilter";

const Filters = styled.div`
  margin-bottom: 40px;

  @media screen and (min-width: 768px) {
    float: left;
    width: 25%;
  }
`;

const FacetFilters: React.FC = () => {
  const { availableFacets } = useSearchPageContextState();
  return (
    <>
      {availableFacets && availableFacets.length > 0 && (
        <Filters>
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
        </Filters>
      )}
    </>
  );
};

export default FacetFilters;
