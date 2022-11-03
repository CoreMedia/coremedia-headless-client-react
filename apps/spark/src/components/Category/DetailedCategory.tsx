import React from "react";
import styled from "styled-components";
import { placementByName } from "../../utils/PageGrid/PageGridUtil";
import Col from "../PageGrid/Col";
import { StyledDetail } from "../Details/Detail";
import { Col as ColPlacement, Placements } from "../../models/Grid/Grid";
import FacetFilters from "../Search/Filters/FacetFilters";
import CategoryHeader from "./CategoryHeader";
import SubCategoryList from "./SubCategoryList";
import ProductList from "./ProductList";

const StyledRow = styled.div`
  display: flex;
  width: 100%;
`;

const Sidebar = styled.div`
  flex: 1 0 auto;
  padding-right: 6px;
  max-width: 25%;

  > div {
    float: none;
    width: auto;
  }
`;
const Content = styled.div`
  flex: 3 0 auto;
  max-width: 75%;

  > div {
    max-width: 100%;
  }
`;

interface Props {
  name?: string | null;
  placements: Placements;
}

const DetailedCategory: React.FC<Props> = ({ name, placements }) => {
  return (
    <StyledDetail>
      <Col col={placementByName(placements, "hero") as ColPlacement} />
      <CategoryHeader>{name}</CategoryHeader>
      <StyledRow>
        <Sidebar>
          <SubCategoryList />
          <FacetFilters />
          <Col col={placementByName(placements, "sidebar") as ColPlacement} />
        </Sidebar>
        <Content>
          <ProductList />
          <Col col={placementByName(placements, "main") as ColPlacement} />
        </Content>
      </StyledRow>
    </StyledDetail>
  );
};
export default DetailedCategory;
