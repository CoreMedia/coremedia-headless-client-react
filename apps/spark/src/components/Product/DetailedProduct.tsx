import React from "react";
import styled from "styled-components";
import Col, { StyledCol } from "../PageGrid/Col";
import { placementByName } from "../../utils/PageGrid/PageGridUtil";
import { StyledDetail } from "../Details/Detail";
import { Col as ColPlacement, Placements } from "../../models/Grid/Grid";
import { DetailProduct } from "../../models/Detail/DetailProduct";
import { useBreakpoints } from "../../utils/TeaserVariants/variantsHelper";
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
  const { isMobile } = useBreakpoints();

  return (
    <>
      {/*Banner*/}
      <Col col={placementByName(placements, "banner") as ColPlacement} />

      {/*Main*/}
      <StyledCol zone={"main"}>
        <StyledDetailProduct style={{ flexDirection: isMobile ? "column" : "row" }}>
          <ProductAssets />
          <ProductDetails />
        </StyledDetailProduct>
      </StyledCol>

      {/* Tab*/}
      <Col col={placementByName(placements, "tab") as ColPlacement} />

      {/*Additional*/}
      <Col col={placementByName(placements, "additional") as ColPlacement} />
    </>
  );
};
export default DetailedProduct;
