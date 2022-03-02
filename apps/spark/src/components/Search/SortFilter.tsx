import React, { ChangeEvent, useMemo } from "react";
import { SortFieldWithOrder } from "@coremedia-labs/graphql-layer";
import { useSearchStateContextState } from "../../context/SearchStateContext";
import { useHistory, useLocation } from "react-router-dom";

const SortFilter: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const urlSearchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);

  const { setSortField, sortField, sortFields } = useSearchStateContextState();

  const onSortChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    e.preventDefault();
    const localSortFieldWithOrder: SortFieldWithOrder | null = (e.currentTarget.value as SortFieldWithOrder) || null;
    setSortField(localSortFieldWithOrder);
    if (localSortFieldWithOrder == null) {
      urlSearchParams.delete("sort");
    } else {
      urlSearchParams.set("sort", localSortFieldWithOrder.toString());
    }
    location.search = urlSearchParams.toString();
    history.push(location);
  };

  return (
    <>
      {sortFields && (
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
                <option key={value} value={value || ""}>
                  {label}
                </option>
              );
            })}
          </select>
        </div>
      )}
    </>
  );
};

export default SortFilter;
