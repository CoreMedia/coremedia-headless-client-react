import React, { ChangeEventHandler } from "react";

interface Props {
  query?: string;
  onQueryChange?: ChangeEventHandler;
}

const SearchQuery: React.FC<Props> = ({ query, onQueryChange }) => {
  return (
    <div className="cm-search--form-result-page ">
      <form className="cm-search--form" autoComplete="off" role="search">
        <fieldset className="cm-search__form-fieldset">
          <label htmlFor="cm-search-result-page-query" className="cm-search__form-label">
            Search
          </label>
          <input
            id="cm-search-result-page-query"
            placeholder="Search..."
            type="search"
            className="cm-search__form-input"
            value={query}
            onChange={onQueryChange}
          />
        </fieldset>
        <button type="submit" className="cm-search__form-button" title="Search">
          <span className="">Search</span>
        </button>
      </form>
    </div>
  );
};

export default SearchQuery;
