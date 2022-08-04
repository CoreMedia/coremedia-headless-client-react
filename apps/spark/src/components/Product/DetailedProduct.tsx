import React from "react";
import styled from "styled-components";
import Col, { StyledCol } from "../PageGrid/Col";
import { placementByName } from "../../utils/PageGrid/PageGridUtil";
import { StyledDetail } from "../Details/Detail";
import { Col as ColPlacement, Placements } from "../../models/Grid/Grid";
import { DetailProduct } from "../../models/Detail/DetailProduct";
import ProductDetails from "./ProductDetails";
import ProductAssets from "./ProductAssets";

const StyledDetailProduct = styled(StyledDetail)`
  display: flex;
`;

interface Props {
  product?: DetailProduct;
  placements: Placements;
}
const DetailedProduct: React.FC<Props> = ({ placements }) => {
  return (
    <>
      <Col col={placementByName(placements, "banner") as ColPlacement} />
      <StyledCol zone={"main"}>
        <StyledDetailProduct>
          <ProductAssets />
          <ProductDetails />
        </StyledDetailProduct>
      </StyledCol>
      <Col col={placementByName(placements, "tab") as ColPlacement} />
      <Col col={placementByName(placements, "additional") as ColPlacement} />
    </>
  );
};
export default DetailedProduct;
