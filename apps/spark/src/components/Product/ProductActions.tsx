import React from "react";
import styled from "styled-components";
import { DetailProduct } from "../../models/Detail/DetailProduct";
import WishIcon from "./assets/wish.svg";

interface Props {
  product: DetailProduct;
}

const StyledActions = styled.div`
  display: flex;
  grid-gap: 1em;
  gap: 1em;
`;

const StyledAddToCart = styled.button`
  font-size: 1rem;
  font-family: var(--font-family-text);
  height: 3.75rem;
  border-radius: 3.75rem;
  text-transform: uppercase;
  flex: 1;
  cursor: pointer;

  color: var(--color-background-light);
  background-color: var(--color-background-dark);
  border: 1px solid var(--color-background-dark);

  &:hover {
    color: var(--color-background-dark);
    background-color: var(--color-background-light);
  }
`;

const StyledWishlist = styled.button`
  font-family: var(--font-family-text);
  height: 3.75rem;
  border-radius: 3.75rem;
  text-transform: uppercase;
  flex: 1;
  color: var(--color-background-dark);
  background-color: var(--color-background-light);
  border: 1px solid var(--color-background-dark);
  cursor: pointer;

  &:hover {
    color: var(--color-background-light);
    background-color: var(--color-background-dark);

    > span {
      fill: var(--color-background-light);
    }
  }

  flex: none !important;
  width: 3.75rem;
  font-size: 0 !important;
  > span {
    width: 1.5rem;
    display: flex;
    margin: 0 auto;
    background: url(${WishIcon}) no-repeat 50% transparent;
    height: 100%;
  }
`;

const ProductActions: React.FC<Props> = ({ product }) => {
  return (
    <StyledActions>
      <StyledAddToCart>Add to cart</StyledAddToCart>

      <StyledWishlist>
        <span />
      </StyledWishlist>
    </StyledActions>
  );
};

export default ProductActions;
