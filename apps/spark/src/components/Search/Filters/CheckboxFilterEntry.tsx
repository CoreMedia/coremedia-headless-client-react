import React from "react";
import styled from "styled-components";
import { useSearchStateContextState } from "../../../context/SearchStateContext";
import Checked from "../assets/checked.svg";
import Unchecked from "../assets/unchecked.svg";
import {
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

const SearchFilterCheckbox = styled.span<{ checked: boolean }>`
  vertical-align: text-top;
  width: 16px;
  height: 16px;
  display: inline-block;
  background-repeat: no-repeat;
  background-position: 50%;
  background-image: url(${(props) => (props.checked ? Checked : Unchecked)});
`;

const CheckboxFilterEntry: React.FC<Props> = ({ title, label, query, count }) => {
  const { addFacet, removeFacet, selectedFacets } = useSearchStateContextState();
  const isSelected = isFacetValueSelected(selectedFacets, title, query);
  return (
    <SearchFilterListItem
      onClick={(e) => {
        if (isSelected) {
          removeFacet({ facetCategory: title, facetLabel: label, facetQuery: query });
        } else {
          addFacet({ facetCategory: title, facetLabel: label, facetQuery: query });
        }
        e.stopPropagation();
      }}
    >
      <SearchFilterCheckbox checked={isSelected} />
      <SearchFilterListLink checked={isSelected}>
        {label}
        {count && count > 0 && <SearchFilterListCount>{count}</SearchFilterListCount>}
      </SearchFilterListLink>
    </SearchFilterListItem>
  );
};

export default CheckboxFilterEntry;
