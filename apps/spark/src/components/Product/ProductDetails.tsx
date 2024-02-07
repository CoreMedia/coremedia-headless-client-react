import React from "react";
import styled from "styled-components";
import { Headline } from "../Details/Detail";
import { StyledRichText } from "../RichText/RichText";
import { useProductPageContextState } from "../../context/ProductPageContext";
import ProductPricing, { Price, StyledPricing } from "./ProductPricing";
import ProductActions from "./ProductActions";

const Textuals = styled.div`
  flex: 1;
  padding-left: 6px;

  ${StyledPricing} {
    margin: var(--padding-medium) 0;
  }

  ${Price} {
    font-size: var(--font-size-heading-3);
  }
`;

const Sticky = styled.div`
  position: sticky;
  top: 0;

  hr {
    box-sizing: border-box;
    width: 100%;
    border: solid var(--color-background-light-grey);
    border-width: 0.0625rem 0 0;
    margin-top: 20px;
  }
`;

const ProductHeadline = styled(Headline)`
  text-align: left;
  margin-top: 0;
`;

const Text = styled(StyledRichText)`
  margin: var(--padding-medium) 0;
  background-color: var(--color-background-light-grey);
  border-radius: 0.75rem;
  line-height: 1.25rem;
  font-size: 0.875rem;
  padding: 1rem;

  & > * {
    width: 100%;
  }
`;

const ProductDetails: React.FC = () => {
  const { product } = useProductPageContextState();
  const description = product && (product.longDescription || product.shortDescription);
  return (
    product && (
      <Textuals>
        <Sticky>
          <ProductHeadline>{product.name}</ProductHeadline>
          <span>{product.id}</span>
          <hr />
          <ProductPricing {...product} />
          {description && <Text dangerouslySetInnerHTML={{ __html: description }} />}
          <ProductActions product={product} />
        </Sticky>
      </Textuals>
    )
  );
};
export default ProductDetails;
