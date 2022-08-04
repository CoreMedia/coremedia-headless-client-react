import React from "react";
import styled from "styled-components";
import { useSearchPageContextState } from "../../context/SearchPageContext";
import { useCategoryPageContextState } from "../../context/CategoryPageContext";
import { Headline } from "../Details/Detail";

const StyledCategoryHeader = styled.div`
  text-align: center;

  h1 {
    display: inline-block;
  }

  span {
    margin-left: 10px;
    margin-bottom: var(--padding-small);
  }
`;

const CategoryHeader: React.FC = () => {
  const { totalCount } = useSearchPageContextState();
  const { categoryName } = useCategoryPageContextState();
  return (
    <StyledCategoryHeader>
      <Headline>{categoryName}</Headline>
      <span>({totalCount})</span>
    </StyledCategoryHeader>
  );
};

export default CategoryHeader;
