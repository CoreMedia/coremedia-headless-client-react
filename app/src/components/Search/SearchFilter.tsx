import React, { ChangeEventHandler } from "react";
import { SortFieldWithOrder } from "../../__generated__/globalTypes";

interface Props {
  onSortChange?: ChangeEventHandler;
  sortFields: Array<{
    label: string;
    value: string;
  }>;

  sortField?: SortFieldWithOrder | null;
}

const SearchFilter: React.FC<Props> = ({ onSortChange, sortField, sortFields }) => {
  return (
    <>
      <div className="cm-search__filter-switch">
        <button
          type="button"
          className="cm-button cm-button--with-icon cm-search__filter-switch-button"
          data-cm-search-filter-popup-toggle=""
        >
          <i aria-label="" className="cm-button__icon cm-search__filter-switch-icon" />
          <span className="cm-button__text">Filters</span>
        </button>
      </div>

      <div className="cm-search__filter-popup">
        <div className="cm-search__filter-popup-head">
          <h2 className="cm-search__filter-popup-heading">Filters</h2>
          <button type="button" className="cm-search__filter-popup-close">
            <i aria-label="" className="cm-search__filter-close-icon" />
            <span className="">Close search</span>
          </button>
        </div>
        <div className="cm-search__sort">
          <label htmlFor="cm-search-sort" className="cm-search__sort-label">
            Sort by
          </label>
          <select
            id="cm-search-sort"
            className="cm-search__sort--dropdown"
            onChange={onSortChange}
            value={sortField || ""}
          >
            {sortFields.map(({ label, value }) => {
              return (
                <option key={value} value={value}>
                  {label}
                </option>
              );
            })}
          </select>
        </div>
        <div className="cm-search__filters">
          {/* <div className="cm-search__filter" data-cm-search-filter="category">
                <h3 className="cm-search__filter-title" data-cm-search-filter-toggle="">
                  Category
                  <i className="cm-search__filter-title-icon" />
                </h3>
                <ul className="cm-search__filter-list" data-cm-search-filter-links="">
                  <li className="cm-search__filter-list-item">
                    <span className="cm-search__filter-list-link cm-search__link">For Consumers</span>
                  </li>
                  <li className="cm-search__filter-list-item">
                    <span className="cm-search__filter-list-link cm-search__link">For Professionals</span>
                  </li>
                  <li className="cm-search__filter-list-item">
                    <span className="cm-search__filter-list-link cm-search__link">Company</span>
                  </li>
                </ul>
              </div>
              <div className="cm-search__filter" data-cm-search-filter="facet">
                <h3 className="cm-search__filter-title" data-cm-search-filter-toggle="">
                  Types
                  <i className="cm-search__filter-title-icon" />
                </h3>
                <ul className="cm-search__filter-list" data-cm-search-filter-links="">
                  <li className="cm-search__filter-list-item">
                    <input
                      id="filter_item1-46ajjzwe7qqf2elv72anv8i57"
                      className="cm-search__filter-list-checkbox"
                      type="checkbox"
                    />
                    <span className="cm-search__filter-list-checkbox-icon " />
                    <label
                      htmlFor="filter_item1-46ajjzwe7qqf2elv72anv8i57"
                      className="cm-search__filter-list-link cm-search__link"
                    >
                      Article
                      <span className="cm-search__filter-list-count">29</span>
                    </label>
                  </li>
                  <li className="cm-search__filter-list-item">
                    <input
                      id="filter_item2-deapoymzkz880tmygfvg4vo7q"
                      className="cm-search__filter-list-checkbox"
                      type="checkbox"
                    />
                    <span className="cm-search__filter-list-checkbox-icon " />
                    <label
                      htmlFor="filter_item2-deapoymzkz880tmygfvg4vo7q"
                      className="cm-search__filter-list-link cm-search__link"
                    >
                      Page
                      <span className="cm-search__filter-list-count">9</span>
                    </label>
                  </li>
                  <li className="cm-search__filter-list-item">
                    <input
                      id="filter_item3-1us1ni48rt14m9vgdmvx8zbd1"
                      className="cm-search__filter-list-checkbox"
                      type="checkbox"
                    />
                    <span className="cm-search__filter-list-checkbox-icon " />
                    <label
                      htmlFor="filter_item3-1us1ni48rt14m9vgdmvx8zbd1"
                      className="cm-search__filter-list-link cm-search__link"
                    >
                      Video
                      <span className="cm-search__filter-list-count">8</span>
                    </label>
                  </li>
                  <li className="cm-search__filter-list-item">
                    <input
                      id="filter_item4-ehh5tj1rhnh7dwb8pb1zstpnb"
                      className="cm-search__filter-list-checkbox"
                      type="checkbox"
                    />
                    <span className="cm-search__filter-list-checkbox-icon " />
                    <label
                      htmlFor="filter_item4-ehh5tj1rhnh7dwb8pb1zstpnb"
                      className="cm-search__filter-list-link cm-search__link"
                    >
                      Product
                      <span className="cm-search__filter-list-count">5</span>
                    </label>
                  </li>
                </ul>
              </div>*/}
        </div>
      </div>
    </>
  );
};

export default SearchFilter;
