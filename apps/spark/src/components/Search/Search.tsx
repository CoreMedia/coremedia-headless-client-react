import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useSearchPageContextState } from "../../context/SearchPageContext";
import { useSearchStateContextState } from "../../context/SearchStateContext";
import { StyledCol } from "../PageGrid/Col";
import SearchFilters from "./SearchFilters";
import SearchQuery from "./SearchQuery";
import SearchResult from "./SearchResult";

const StyledSearch = styled.div`
  color: #000;
  font-size: var(--font-size-text-small);
  @media screen and (min-width: 768px) and (max-width: 1199px) and (orientation: landscape) {
    padding-left: 0;
  }

  @media screen and (min-width: 1200px) {
    padding-left: 0;
  }
`;

const SearchHeader = styled.div`
  padding-bottom: 20px;

  h1 {
    margin-top: 20px;
    margin-bottom: 10px;
    font-size: var(--font-size-heading-2);
  }

  div {
    @media screen and (min-width: 768px) {
      height: 20px;
    }
    margin-top: 0;

    span {
      color: #000;
      font-style: italic;

      &:after,
      &:before {
        content: '"';
      }
    }
  }
`;

const Search: React.FC = () => {
  const { totalCount } = useSearchPageContextState();
  const { query } = useSearchStateContextState();
  const { t } = useTranslation();
  return (
    <StyledCol zone={"main"}>
      <StyledSearch>
        <SearchHeader>
          <h1>{t("Search.Header.title")}</h1>
          {query && (
            <div
              dangerouslySetInnerHTML={{ __html: t("Search.Header.message", { query: query, totalCount: totalCount }) }}
            />
          )}
        </SearchHeader>
        <div>
          <SearchQuery />
          <SearchFilters />
          <SearchResult />
        </div>
      </StyledSearch>
    </StyledCol>
  );
};

export default Search;
