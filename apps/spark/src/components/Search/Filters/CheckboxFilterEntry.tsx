import React from "react";
import { useSearchStateContextState } from "../../../context/SearchStateContext";
import { isFacetValueSelected } from "./SearchFilter";

interface Props {
  title: string;
  label: string;
  query: string;
  count?: number;
}

const CheckboxFilterEntry: React.FC<Props> = ({ title, label, query, count }) => {
  const { addFacet, removeFacet, selectedFacets } = useSearchStateContextState();
  const isSelected = isFacetValueSelected(selectedFacets, title, query);
  return (
    <li
      className="cm-search__filter-list-item"
      onClick={(e) => {
        if (isSelected) {
          removeFacet({ facetCategory: title, facetLabel: label, facetQuery: query });
        } else {
          addFacet({ facetCategory: title, facetLabel: label, facetQuery: query });
        }
        e.stopPropagation();
      }}
    >
      <span
        className={
          isSelected
            ? "cm-search__filter-list-checkbox-icon cm-search__filter-list-checkbox-icon--checked"
            : "cm-search__filter-list-checkbox-icon"
        }
      />
      <span
        className={
          isSelected
            ? "cm-search__filter-list-link cm-search__filter-list-link--checked"
            : "cm-search__filter-list-link"
        }
      >
        {label}
        {count && count > 0 && <span className="cm-search__filter-list-count">{count}</span>}
      </span>
    </li>
  );
};

export default CheckboxFilterEntry;
