import React from "react";
import styled, { css } from "styled-components";
import { useTranslation } from "react-i18next";
import { SearchFacet, useSearchStateContextState } from "../../../context/SearchStateContext";
import Chevron from "../assets/chevron.svg";
import ArrowBack from "../assets/arrow-back.svg";
import CheckboxFilterEntry from "./CheckboxFilterEntry";
import StringFilterEntry from "./StringFilterEntry";

type FilterType = "checkbox" | "text";

interface Props {
  title: string;
  entries:
    | Array<{
        label: string;
        query: string;
        count?: number;
        selected?: boolean;
      }>
    | undefined;
  filterType?: FilterType;
}

export const isFacetValueSelected = (
  selectedFacets: Array<SearchFacet>,
  title: string,
  facetQuery: string
): boolean => {
  return (
    selectedFacets.findIndex((value) => {
      return value.facetCategory === title && value.facetQuery === facetQuery;
    }) >= 0
  );
};

export const isActiveGroup = (selectedFacets: Array<SearchFacet>, title: string) => {
  return selectedFacets.find((value) => {
    return value.facetCategory === title;
  });
};

const StyledSearchFilter = styled.div`
  width: 100%;
  max-width: 300px;
  padding: 0 20px 20px 0;
  box-sizing: border-box;
`;

const SearchFilterTitle = styled.h3<{ isClosed: boolean }>`
  cursor: pointer;
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: 500;
  text-transform: uppercase;

  i {
    margin-left: 10px;
    vertical-align: text-top;
    width: 16px;
    height: 16px;
    display: inline-block;
    background-repeat: no-repeat;
    background-position: 50%;
    background-image: url(${Chevron});
    transform: ${(props) => (props.isClosed ? css`rotate(0deg)` : css`rotate(180deg)`)};
    transition: all 0.2s ease;
  }
`;

const SearchFilterList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const SearchFilterListItem = styled.li`
  line-height: 1.714;
`;

export const SearchFilterListLink = styled.span<{ checked: boolean }>`
  margin: 0;
  cursor: pointer;
  color: #222;
  text-decoration: underline;
`;

export const SearchFilterListCount = styled.span`
  &:before {
    content: " (";
  }

  &:after {
    content: ")";
  }
`;

const SearchFilterAllItems = styled.li`
  margin: 0;
  cursor: pointer;
  color: #222;
  text-decoration: underline;
`;

const AllIcon = styled.i`
  vertical-align: text-top;
  width: 16px;
  height: 16px;
  display: inline-block;
  background-repeat: no-repeat;
  background-position: 50%;
  background-image: url(${ArrowBack});
  margin-right: 5px;
`;

const SearchFilter: React.FC<Props> = ({ title, entries, filterType = "checkbox" }) => {
  const { removeFacets, selectedFacets } = useSearchStateContextState();

  const [isOpen, setIsOpen] = React.useState(true);
  const { t } = useTranslation();

  return (
    <StyledSearchFilter onClick={() => setIsOpen(!isOpen)}>
      <SearchFilterTitle isClosed={!isOpen}>
        {t(title)}
        <i />
      </SearchFilterTitle>
      <form style={!isOpen ? { display: "none" } : {}}>
        <SearchFilterList>
          {isActiveGroup(selectedFacets, title) && (
            <SearchFilterAllItems
              onClick={(e) => {
                removeFacets(title);
                e.stopPropagation();
              }}
            >
              <AllIcon />
              <span>{t("SearchFilter.allTypes")}</span>
            </SearchFilterAllItems>
          )}
          {entries?.map((item, index) => {
            let components = null;
            if (filterType === "checkbox") {
              components = (
                <CheckboxFilterEntry
                  key={index}
                  title={title}
                  label={t(item.label)}
                  query={item.query}
                  count={item.count}
                />
              );
            } else if (filterType === "text") {
              components = (
                <StringFilterEntry key={index} title={title} label={item.label} query={item.query} count={item.count} />
              );
            }
            return components;
          })}
        </SearchFilterList>
      </form>
    </StyledSearchFilter>
  );
};

export default SearchFilter;
