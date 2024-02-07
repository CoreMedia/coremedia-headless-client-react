import React, { useState } from "react";
import styled, { css } from "styled-components";
import { useTranslation } from "react-i18next";
import SortFilter from "./SortFilter";
import FacetFilters from "./Filters/FacetFilters";
import FilterIcon from "./assets/filter.svg";

const SearchFilterSwitch = styled.div`
  margin-bottom: 20px;
  text-align: right;

  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const SearchFilterSwitchIcon = styled.i`
  mask-image: url(${FilterIcon});
  background-color: var(--color-background-light);
  float: right;
  margin: 3px 0 0 5px;
  vertical-align: text-top;
  width: 16px;
  height: 16px;
  display: inline-block;
  background-repeat: no-repeat;
  background-position: 50%;
`;

const SearchFilterPopup = styled.div<{ active: boolean }>`
  display: none;
  box-sizing: border-box;
  padding: 0 10px;
  @media screen and (min-width: 768px) {
    display: block;
    padding: 0;
  }

  ${(props) =>
    props.active &&
    css`
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 1;
      background-color: #fff;
      @media screen and (max-width: 767px) {
        padding-top: 50px;
        position: fixed;
        bottom: 0;
      }
      @media screen and (min-width: 768px) {
        position: static;
        top: auto;
        left: auto;
        width: auto;
        z-index: auto;
        background-color: transparent;
      }
    `}
`;

const SearchFilterPopupHead = styled.div<{ active: boolean }>`
  display: none;
  margin: 20px 0;

  ${(props) =>
    props.active &&
    css`
      display: flex;

      @media screen and (min-width: 768px) {
        display: none;
      }
    `};

  h2 {
    flex: 1 1 auto;
    margin-top: 0;
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: 500;
  }
`;

const SearchFilterButton = styled.button`
  position: relative;
  text-decoration: none;
  color: var(--color-cta-font-hover);
  background-color: var(--color-green-highlight);
  border-radius: 0;
  pointer-events: auto;
  text-transform: uppercase;
  padding: 10px 20px 5px;
  transition: all 0.1s ease;
  font-size: var(--font-size-heading-3);
  font-family: var(--font-family-headline);
  border: 0;

  &:hover {
    background-color: var(--color-green-highlight-hover);
    color: var(--color-cta-font-hover);
  }

  &:active,
  &:focus {
    outline: none;
    background-color: var(--color-green-highlight-active);
    box-shadow:
      inset 0 0 0 1px #fff,
      inset 0 0 0 2px #000;
  }
  span {
    display: none;
  }
`;

const SearchFilters: React.FC = () => {
  const [toggled, setToggled] = useState(false);
  const { t } = useTranslation();
  return (
    <>
      <SearchFilterSwitch>
        <SearchFilterButton
          type="button"
          onClick={() => {
            setToggled(!toggled);
          }}
        >
          <SearchFilterSwitchIcon aria-label="" />
          <span>{t("SearchFilters.filters")}</span>
        </SearchFilterButton>
      </SearchFilterSwitch>

      <SearchFilterPopup active={toggled !== undefined && toggled}>
        <SearchFilterPopupHead active={toggled !== undefined && toggled}>
          <h2>{t("SearchFilters.filters")}</h2>
          <button
            type="button"
            onClick={() => {
              setToggled(!toggled);
            }}
          >
            <i aria-label="" />
            <span>{t("SearchFilters.closeSearch")}</span>
          </button>
        </SearchFilterPopupHead>
        <SortFilter />
        <FacetFilters />
      </SearchFilterPopup>
    </>
  );
};

export default SearchFilters;
