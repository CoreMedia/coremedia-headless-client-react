import React, { ChangeEvent, useMemo } from "react";
import { SortFieldWithOrder } from "@coremedia-labs/graphql-layer";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useSearchStateContextState } from "../../context/SearchStateContext";
import { getLocalizedLabel } from "../../utils/Translation/TranslationHelper";

const StyledSort = styled.div`
  height: 74px;

  @media screen and (min-width: 768px) {
    float: right;
    width: 100%;
    padding-bottom: 20px;
    margin-bottom: 0;
    text-align: right;
  }

  label {
    padding: 5px 10px 5px 0;
    font-weight: 700;
  }

  select {
    padding: 5px 10px;
    margin-bottom: 20px;
    text-align: left;
    height: 34px;
    border: 1px solid #000;
    border-radius: 2px;
  }
`;
const SortFilter: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const urlSearchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);

  const { setSortField, sortField, sortFields } = useSearchStateContextState();
  const { t } = useTranslation();

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
        <StyledSort>
          <label htmlFor="cm-search-sort">{t("SortFilter.sortBy")}</label>
          <select id="cm-search-sort" onChange={onSortChange} value={sortField || ""}>
            {sortFields.map(({ label, value }) => {
              return (
                <option key={value} value={value || ""}>
                  {getLocalizedLabel(label, "SortFilter")}
                </option>
              );
            })}
          </select>
        </StyledSort>
      )}
    </>
  );
};

export default SortFilter;
