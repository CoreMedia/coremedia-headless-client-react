import React, { FC, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useSuggestLazyQuery } from "@coremedia-labs/graphql-layer";
import { useSearchStateContextState } from "../../context/SearchStateContext";
import Hamburger from "../Header/Hamburger";
import { useSiteContextState } from "../../context/SiteContextProvider";
import { ApolloClientAlert } from "../Error/Alert";
import { LanguageChooserMenu } from "../Header/LanguageChooser";
import { SearchButton, SearchFormFieldSet, SearchFormLabel, SearchInput } from "./SearchQuery";

const StyledSearch = styled.div`
  margin-left: 10px;
  position: relative;

  @media screen and (min-width: 768px) and (orientation: landscape), screen and (min-width: 1200px) {
    margin-left: 15px;
    order: 3;
  }

  @media screen and (max-width: 767px),
    screen and (min-width: 768px) and (max-width: 1199px) and (orientation: portrait) {
    display: none;
  }

  > div {
    flex-grow: 1;
    margin-right: 15px;

    @media screen and (min-width: 768px) and (orientation: landscape), screen and (min-width: 1200px) {
      flex-grow: 0;
      margin-right: 0;
    }
  }

  .react-autosuggest__container {
    flex-grow: 1;
    margin-right: 15px;

    @media screen and (min-width: 768px) and (orientation: landscape), screen and (min-width: 1200px) {
      flex-grow: 0;
      margin-right: 0;
    }
  }

  .react-autosuggest__container {
    position: relative;
  }

  .react-autosuggest__input--focused {
    outline: none;
  }

  .react-autosuggest__input::-ms-clear {
    display: none;
  }

  .react-autosuggest__input--open {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  .react-autosuggest__suggestions-container {
    display: none;
  }

  .react-autosuggest__suggestions-container--open {
    display: block;
    position: absolute;
    top: 51px;
    width: 280px;
    border: 1px solid #aaa;
    background-color: #fff;
    font-family: "Open Sans", sans-serif;
    font-weight: 300;
    font-size: 16px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    z-index: 2;
  }

  .react-autosuggest__suggestions-list {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  .react-autosuggest__suggestion {
    cursor: pointer;
    padding: 10px 20px;
  }

  .react-autosuggest__suggestion--highlighted {
    background-color: #ddd;
  }

  .react-autosuggest__section-container {
    border-top: 1px dashed #ccc;
  }

  .react-autosuggest__section-container--first {
    border-top: 0;
  }

  .react-autosuggest__section-title {
    padding: 10px 0 0 10px;
    font-size: 12px;
    color: #777;
  }
`;

const HeaderInput = styled(SearchInput)`
  background-color: #fff;

  @media screen and (max-width: 767px),
    screen and (min-width: 768px) and (max-width: 1199px) and (orientation: portrait) {
    display: inline-block;
    box-sizing: border-box;
    height: 48px;
    width: 100%;
    padding-right: 44px;
    border: none;
    font-size: 20px;
    color: #000;
    background-color: transparent;
    box-shadow: none;
    &:focus {
      box-shadow: none;
    }
  }
`;

const StyledForm = styled.form`
  flex-grow: 1;
  margin-right: 15px;

  @media screen and (min-width: 768px) and (orientation: landscape), screen and (min-width: 1200px) {
    flex-grow: 0;
    margin-right: 0;
  }
`;

const HeaderSearchButton = styled(SearchButton)`
  top: 7px;
  background-size: 44px;

  @media screen and (min-width: 768px) and (max-width: 1199px) and (orientation: landscape),
    screen and (min-width: 1200px) {
    top: 3px;
    background-size: 32px;
  }
`;

const StyledSuggestionMenu = styled(LanguageChooserMenu)`
  @media screen and (min-width: 768px) {
    top: 100%;
    left: 0;
    box-sizing: border-box;
    width: 250px;
    min-width: 250px;
    border: 1px solid #000;
    border-top: 0;
    background-color: #fff;
  }

  > li > div {
    cursor: pointer;
    line-height: 32px;
    padding: 2px 0 2px 6px;
    margin: 0;
    text-decoration: none;
  }
`;

export const SuggestionListCount = styled.span`
  padding-left: 6px;
  &:before {
    content: "(";
  }

  &:after {
    content: ")";
  }
`;

interface SearchSuggestion {
  value: string;
  count: number;
}

const HeaderSearchForm: FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const history = useHistory();
  const { rootSegment } = useSiteContextState();
  const location = useLocation();
  const { setQuery } = useSearchStateContextState();

  const [suggestions, setSuggestions] = useState<Array<any>>([]);

  const [getSuggestionQuery, { error }] = useSuggestLazyQuery();
  const { siteId } = useSiteContextState();

  const onChangeHandler = (text: string) => {
    if (text.length > 2) {
      getSuggestionQuery({ variables: { query: text, siteId: siteId } })
        .then((data) => data.data?.content?.suggest)
        .then((suggest: Array<SearchSuggestion> | undefined | null) => {
          if (suggest) {
            let mutableArray = [...suggest];
            mutableArray = mutableArray
              .sort((a, b) => (a.count >= b.count ? -1 : 1))
              .slice(0, 10)
              .map((item) => {
                return { value: item.value, count: item.count };
              });
            setSuggestions(mutableArray);
          }
          return [];
        });
    } else {
      setSuggestions([]);
    }
    setSearchQuery(text);
  };

  const onSuggestHandler = (text: string) => {
    setQuery(text);
    setSuggestions([]);
    history.push({
      pathname: `/${rootSegment}/search`,
      search: "?query=" + text,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onSuggestHandler(searchQuery);
  };

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(location.search);
    setSearchQuery(urlSearchParams.get("query") || "");
  }, [location.search]);

  if (error) return <ApolloClientAlert error={error} />;

  return (
    <StyledSearch>
      <Hamburger
        clickHandler={() => {
          return;
        }}
      />
      <StyledForm onSubmit={handleSubmit} autoComplete="off" role="search">
        <SearchFormFieldSet>
          <SearchFormLabel htmlFor="SimpleSearchForm_SearchTerm">Search</SearchFormLabel>
          <HeaderInput
            onChange={(event) => onChangeHandler(event.target.value)}
            type="search"
            name="query"
            placeholder="Search..."
            required={true}
            minLength={3}
            //onBlur={() => setSuggestions([])}
            value={searchQuery}
          />
        </SearchFormFieldSet>
        <HeaderSearchButton type="submit" title="Search">
          <span>Search</span>
        </HeaderSearchButton>
        <StyledSuggestionMenu open={suggestions && suggestions.length > 0}>
          {suggestions &&
            suggestions.map((suggestion, i) => (
              <li key={i} onClick={() => onSuggestHandler(suggestion.value)}>
                <div>
                  {suggestion.value}
                  <SuggestionListCount>{suggestion.count}</SuggestionListCount>
                </div>
              </li>
            ))}
        </StyledSuggestionMenu>
      </StyledForm>
    </StyledSearch>
  );
};

export default HeaderSearchForm;
