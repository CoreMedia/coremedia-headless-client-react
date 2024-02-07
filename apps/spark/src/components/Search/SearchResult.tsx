import React from "react";
import styled from "styled-components";
import { useSearchPageContextState } from "../../context/SearchPageContext";
import { useSiteContextState } from "../../context/SiteContextProvider";
import { initializeBannerFor } from "../../models/Banner/Banner";
import { notEmpty } from "../../utils/Helpers";
import SearchBanner from "./SearchBanner";

export const MoreButton = styled.button`
  background: var(--cta-background);
  border-radius: var(--cta-border-radius);
  border: var(--cta-border);
  color: var(--cta-text-color);
  cursor: pointer;
  display: block;
  font-family: var(--font-family-headline);
  font-size: var(--font-size-heading-3);
  margin: 0 auto;
  padding: 10px 20px 5px;
  pointer-events: auto;
  position: relative;
  text-decoration: none;
  text-transform: uppercase;
  transition: all 0.1s ease;

  &:hover {
    background-color: var(--cta-background-hover);
    border: var(--cta-border-hover);
    color: var(--cta-text-color-hover);
  }

  &:active,
  &:focus {
    outline: none;
    background: var(--cta-background-active);
    border: var(--cta-border-active);
    color: var(--cta-primary-text-color-active) " : " var(--cta-text-color-active);
    box-shadow:
      inset 0 0 0 1px var(--cta-background-active),
      inset 0 0 0 2px var(--cta-text-color-active);
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
