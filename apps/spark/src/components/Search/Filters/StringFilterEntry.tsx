import React from "react";
import { useSearchStateContextState } from "../../../context/SearchStateContext";
import { getLocalizedLabel } from "../../../utils/Translation/TranslationHelper";
import {
  isActiveGroup,
  isFacetValueSelected,
  SearchFilterListCount,
  SearchFilterListItem,
  SearchFilterListLink,
} from "./SearchFilter";

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
    <SearchFilterListItem
      onClick={(e) => {
        if (hasSelectedItem) {
          removeFacets(title);
        }
        addFacet({ facetCategory: title, facetLabel: label, facetQuery: query });
        e.stopPropagation();
      }}
    >
      {!isSelected && (
        <SearchFilterListLink checked={false}>
          {/*TODO: Get localized tag label*/}
          {title === "subject" ? label : getLocalizedLabel(title + "_" + label, "SearchFilter")}
          {count && count > 0 && <SearchFilterListCount>{count}</SearchFilterListCount>}
        </SearchFilterListLink>
      )}
      {isSelected && label}
    </SearchFilterListItem>
  );
};

export default StringFilterEntry;
