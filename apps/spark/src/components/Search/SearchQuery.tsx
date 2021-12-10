import React, { FormEvent, useEffect, useMemo, useState } from "react";
import { useSearchStateContextState } from "../../context/SearchStateContext";
import { useHistory, useLocation } from "react-router-dom";

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
    <div className="cm-search--form-result-page ">
      <form onSubmit={onSubmit} className="cm-search--form" autoComplete="off" role="search">
        <fieldset className="cm-search__form-fieldset">
          <label htmlFor="cm-search-result-page-query" className="cm-search__form-label">
            Search
          </label>
          <input
            id="cm-search-result-page-query"
            placeholder="Search..."
            type="search"
            className="cm-search__form-input"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            name="query"
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
