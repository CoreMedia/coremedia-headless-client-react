import * as React from "react";
import { FC, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { getGlobalState } from "../../utils/App/GlobalState";

import "./HeaderSearchForm.scss";
import { useSearchStateContextState } from "../../context/SearchStateContext";

const HeaderSearchForm: FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const history = useHistory();
  const { rootSegment } = getGlobalState();
  const location = useLocation();
  const { setQuery } = useSearchStateContextState();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setQuery(searchQuery);
    history.push({
      pathname: `/${rootSegment}/search`,
      search: "?query=" + searchQuery,
    });
  };

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(location.search);
    setSearchQuery(urlSearchParams.get("query") || "");
  }, [location.search]);

  return (
    <div id="cmSearchWrapper" className="cm-header__search cm-search">
      <button
        type="button"
        className="cm-search__form-close cm-hamburger-icon cm-hamburger-icon--toggled"
        aria-label="Close search"
      >
        <span className="cm-hamburger-icon__bar1"></span>
        <span className="cm-hamburger-icon__bar2"></span>
        <span className="cm-hamburger-icon__bar3"></span>
      </button>
      <form onSubmit={handleSubmit} className=" cm-search--form" autoComplete="off" role="search">
        <fieldset className="cm-search__form-fieldset">
          <label htmlFor="SimpleSearchForm_SearchTerm" className="cm-search__form-label">
            Search
          </label>
          <input
            onChange={(event) => setSearchQuery(event.target.value)}
            type="search"
            className="cm-search__form-input"
            name="query"
            placeholder="Search..."
            required={true}
            minLength={3}
            value={searchQuery}
          />
        </fieldset>
        <button type="submit" className="cm-search__form-button" title="Search">
          <span className="">Search</span>
        </button>
      </form>
    </div>
  );
};

export default HeaderSearchForm;
