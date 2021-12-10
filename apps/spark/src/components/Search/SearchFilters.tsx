import React, { useState } from "react";
import SortFilter from "./SortFilter";
import FacetFilters from "./Filters/FacetFilters";

const SearchFilters: React.FC = () => {
  const [toggled, setToggled] = useState(false);
  return (
    <>
      <div className="cm-search__filter-switch">
        <button
          type="button"
          className="cm-button cm-button--with-icon cm-search__filter-switch-button"
          onClick={() => {
            setToggled(!toggled);
          }}
        >
          <i aria-label="" className="cm-button__icon cm-search__filter-switch-icon" />
          <span className="cm-button__text">Filters</span>
        </button>
      </div>

      <div
        className={
          toggled !== undefined && toggled
            ? "cm-search__filter-popup cm-search__filter-popup--active"
            : "cm-search__filter-popup"
        }
      >
        <div className="cm-search__filter-popup-head">
          <h2 className="cm-search__filter-popup-heading">Filters</h2>
          <button
            type="button"
            className="cm-search__filter-popup-close"
            onClick={() => {
              setToggled(!toggled);
            }}
          >
            <i aria-label="" className="cm-search__filter-close-icon" />
            <span className="">Close search</span>
          </button>
        </div>
        <SortFilter />
        <FacetFilters />
      </div>
    </>
  );
};

export default SearchFilters;
