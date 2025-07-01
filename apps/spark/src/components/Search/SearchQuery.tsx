import React, { FormEvent, useEffect, useMemo, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useSearchStateContextState } from "../../context/SearchStateContext";

import Magnifier from "./assets/magnifier.svg";

export const SearchButton = styled.button`
  position: absolute;
  border: none;
  top: 0;
  right: 0;
  width: 34px;
  height: 34px;
  background: url("${Magnifier}") no-repeat center center transparent;
  cursor: pointer;
  padding: 1px 10px;

  background-size: 32px;

  @media screen and (min-width: 768px) and (max-width: 1199px) and (orientation: landscape),
    screen and (min-width: 1200px) {
    top: 3px;
    right: 3px;
    width: 28px;
    height: 28px;
  }

  span {
    display: none;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  height: auto;
  display: inline-block;
  padding: 6px 12px;
  color: #000;
  border: 1px solid #000;
  border-radius: 2px;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  transition:
    border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
  font-size: var(--font-size-text-small);
  line-height: 1.428571429;

  &:focus {
    border-color: #000;
    outline: none;
    box-shadow:
      inset 0 0 0 1px #fff,
      inset 0 0 0 2px #000;
  }

  @media screen and (min-width: 768px) {
    width: 250px;
  }

  /* clears the 'X' from Internet Explorer */
  &::-ms-clear,
  &::-ms-reveal {
    display: none;
    width: 0;
    height: 0;
  }

  /* clears the 'X' from Chrome */
  &::-webkit-search-decoration,
  &::-webkit-search-cancel-button,
  &::-webkit-search-results-button,
  &::-webkit-search-results-decoration {
    display: none;
  }
`;

const SearchForm = styled.form`
  position: relative;
`;

export const SearchFormLabel = styled.label`
  display: none;
`;

export const SearchFormFieldSet = styled.fieldset`
  padding: 0;
  margin: 0;
  border: 0;
  min-width: 0;
`;

const SearchFormResultPage = styled.div`
  margin-bottom: 20px;
  @media screen and (min-width: 768px) {
    position: absolute;
    /*padding-left: 25%;*/
    margin-bottom: 0;
    /* TODO*/
    &-without-filters {
      padding-left: 0;
    }
  }
`;

const SearchQuery: React.FC = () => {
  const { setQuery, query } = useSearchStateContextState();
  const [searchQuery, setSearchQuery] = useState(query);

  const history = useHistory();
  const location = useLocation();
  const urlSearchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(location.search);
    setSearchQuery(urlSearchParams.get("query") || "");
  }, [location.search]);

  const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (searchQuery && searchQuery !== query) {
      setQuery(searchQuery);
      urlSearchParams.set("query", searchQuery);
      location.search = urlSearchParams.toString();
      history.push(location);
    }
  };

  return (
    <SearchFormResultPage>
      <SearchForm onSubmit={onSubmit} autoComplete="off" role="search">
        <SearchFormFieldSet>
          <SearchFormLabel htmlFor="cm-search-result-page-query">Search</SearchFormLabel>
          <SearchInput
            placeholder="Search..."
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            name="query"
          />
        </SearchFormFieldSet>
        <SearchButton type="submit" title="Search">
          <span>Search</span>
        </SearchButton>
      </SearchForm>
    </SearchFormResultPage>
  );
};

export default SearchQuery;
