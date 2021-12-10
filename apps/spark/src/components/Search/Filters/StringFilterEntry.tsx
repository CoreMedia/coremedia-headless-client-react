import React from "react";
import { isActiveGroup, isFacetValueSelected } from "./SearchFilter";
import { useSearchStateContextState } from "../../../context/SearchStateContext";

interface Props {
  title: string;
  label: string;
  query: string;
  count?: number;
}

const StringFilterEntry: React.FC<Props> = ({ title, label, query, count }) => {
  const { addFacet, removeFacets, selectedFacets } = useSearchStateContextState();
  const isSelected = isFacetValueSelected(selectedFacets, title, query);
  const hasSelectedItem = isActiveGroup(selectedFacets, title);
  return (
    <li
      className="cm-search__filter-list-item"
      onClick={(e) => {
        if (hasSelectedItem) {
          removeFacets(title);
        }
        addFacet({ facetCategory: title, facetLabel: label, facetQuery: query });
        e.stopPropagation();
      }}
    >
      {!isSelected && (
        <span className="cm-search__filter-list-link cm-search__link">
          {label}
          {count && count > 0 && <span className="cm-search__filter-list-count">{count}</span>}
        </span>
      )}
      {isSelected && label}
    </li>
  );
};

export default StringFilterEntry;
