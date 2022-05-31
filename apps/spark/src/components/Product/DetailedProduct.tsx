import React from "react";
import styled from "styled-components";
import Col, { StyledCol } from "../PageGrid/Col";
import { colByName } from "../../utils/PageGrid/PageGridUtil";
import { DetailProduct } from "../../models/Detail/DetailProduct";
import { StyledDetail } from "../Details/Detail";
import ProductDetails from "./ProductDetails";
import ProductAssets from "./ProductAssets";

const StyledDetailProduct = styled(StyledDetail)`
  display: flex;
`;
const DetailedProduct: React.FC<DetailProduct> = ({ name, shortDescription, longDescription, pictures, grid }) => {
  return (
    <>
      <Col col={colByName(grid, "banner")} />
      <StyledCol zone={"main"}>
        <StyledDetailProduct>
          {<ProductAssets pictures={pictures} />}
          {<ProductDetails name={name} shortDescription={shortDescription} longDescription={longDescription} />}
        </StyledDetailProduct>
      </StyledCol>
      <Col col={colByName(grid, "tab")} />
      <Col col={colByName(grid, "additional")} />
    </>
  );
};
export default DetailedProduct;
