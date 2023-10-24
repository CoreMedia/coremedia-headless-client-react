import React from "react";
import styled from "styled-components";
import { useSearchPageContextState } from "../../context/SearchPageContext";
import { useSiteContextState } from "../../context/SiteContextProvider";
import { initializeBannerFor } from "../../models/Banner/Banner";
import { notEmpty } from "../../utils/Helpers";
import SearchBanner from "./SearchBanner";

export const MoreButton = styled.button`
  display: block;
  margin: 0 auto;
  border: none;
  cursor: pointer;
  position: relative;
  text-decoration: none;
  color: var(--color-font-cta-hover);
  background-color: var(--color-green-highlight);
  border-radius: 0;
  pointer-events: auto;
  text-transform: uppercase;
  padding: 10px 20px 5px;
  transition: all 0.1s ease;
  font-size: var(--font-size-heading-3);
  font-family: var(--font-family-headline);

  &:hover {
    background-color: var(--color-green-highlight-hover);
    color: var(--color-font-cta-hover);
  }

  &:active,
  &:focus {
    outline: none;
    background-color: var(--color-green-highlight-active);
    box-shadow:
      inset 0 0 0 1px #fff,
      inset 0 0 0 2px #000;
  }
`;

const StyledResults = styled.div<{ hasFilters: boolean }>`
  display: block;
  min-height: 50vh;
  margin-bottom: 96px;

  @media screen and (min-width: 768px) {
    width: ${(props) => (props.hasFilters ? "75%" : "100%")};
    float: ${(props) => (props.hasFilters ? "right" : "none")};
    clear: ${(props) => (props.hasFilters ? "none" : "both")};
    border: none;
    padding: 0;
  }
`;

const SearchResult: React.FC = () => {
  const { rootSegment } = useSiteContextState();
  const { availableFacets, result, totalCount, onLoadMore, isLoading } = useSearchPageContextState();
  return (
    <StyledResults hasFilters={(availableFacets && availableFacets.length > 0) || false}>
      {result &&
        result
          .map((item) => initializeBannerFor(item, rootSegment))
          .filter(notEmpty)
          .map((item, index) => {
            return <SearchBanner key={index} banner={item} />;
          })}
      {result && result.length < totalCount && (
        <MoreButton onClick={onLoadMore} disabled={isLoading}>
          {isLoading ? "Loading..." : "Show More"}
        </MoreButton>
      )}
    </StyledResults>
  );
};

export default SearchResult;
