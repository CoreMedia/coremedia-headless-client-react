import React from "react";
import CheckboxFilterEntry from "./CheckboxFilterEntry";
import StringFilterEntry from "./StringFilterEntry";
import { SearchFacet, useSearchStateContextState } from "../../../context/SearchStateContext";

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

const SearchFilter: React.FC<Props> = ({ title, entries, filterType = "checkbox" }) => {
  const { removeFacets, selectedFacets } = useSearchStateContextState();

  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <div className="cm-search__filter" onClick={() => setIsOpen(!isOpen)}>
      <h3 className={`cm-search__filter-title ${!isOpen ? "cm-search__filter-title--list-collapsed" : ""}`}>
        {title}
        <i className="cm-search__filter-title-icon" />
      </h3>
      <form className={"cm-search__filter-listing"} style={!isOpen ? { display: "none" } : {}}>
        <ul className="cm-search__filter-list">
          {isActiveGroup(selectedFacets, title) && (
            <li>
              <i className="cm-button__icon cm-search__filter-all-icon" />
              <span
                className="cm-search__filter-list-link cm-search__link"
                onClick={(e) => {
                  removeFacets(title);
                  e.stopPropagation();
                }}
              >
                All types
              </span>
            </li>
          )}
          {entries?.map((item, index) => {
            return (
              <>
                {filterType === "checkbox" && (
                  <CheckboxFilterEntry
                    key={index}
                    title={title}
                    label={item.label}
                    query={item.query}
                    count={item.count}
                  />
                )}
                {filterType === "text" && (
                  <StringFilterEntry
                    key={index}
                    title={title}
                    label={item.label}
                    query={item.query}
                    count={item.count}
                  />
                )}
              </>
            );
          })}
        </ul>
      </form>
    </div>
  );
};

export default SearchFilter;
