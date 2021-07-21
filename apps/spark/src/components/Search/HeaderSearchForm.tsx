import * as React from "react";
import { FC, useState } from "react";
import { useHistory } from "react-router-dom";
import { getGlobalState } from "../../utils/App/GlobalState";

import "./HeaderSearchForm.scss";

const HeaderSearchForm: FC = () => {
  const placeholder = "Search...";
  const minLength = 3;
  const [value, setValue] = useState<string>("");
  const history = useHistory();
  const { rootSegment } = getGlobalState();

  const handleSubmit = (): void => {
    history.push(`/${rootSegment}/search`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    setValue(e.currentTarget.value);
  };

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
            onChange={handleChange}
            id="SimpleSearchForm_SearchTerm"
            type="search"
            className="cm-search__form-input"
            name="query"
            placeholder={placeholder}
            required={true}
            minLength={minLength}
            value={value}
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
