import React from "react";
import styled from "styled-components";
import PortraitBannerContainer from "../PortraitBanner/PortraitBannerContainer";
import { useSearchPageContextState } from "../../context/SearchPageContext";
import { MoreButton } from "../Search/SearchResult";
import { initializeMetadata } from "../../utils/Preview/MetaData";
import { useCategoryPageContextState } from "../../context/CategoryPageContext";
import { Slot } from "../../models/Grid/Slot";
import { addProperty } from "../../utils/ViewDispatcher/ModelHelper";
import { notEmpty } from "../../utils/Helpers";

const StyledListing = styled.div`
  margin-top: var(--grid-gap);
`;

const ProductList: React.FC = () => {
  const { categoryName } = useCategoryPageContextState();
  const { result, onLoadMore, isLoading } = useSearchPageContextState();
  const slot: Slot = {
    items: [],
    metadata: initializeMetadata(categoryName, "commerce").metadata,
  };
  result && addProperty(slot, "items", result.filter(notEmpty), "properties.products");
  return (
    <>
      {result && (
        <StyledListing>
          <PortraitBannerContainer {...slot} />
          <MoreButton as={"button"} onClick={onLoadMore} disabled={isLoading}>
            {isLoading ? "Loading..." : "Show More"}
          </MoreButton>
        </StyledListing>
      )}
    </>
  );
};

export default ProductList;
