import React from "react";
import styled from "styled-components";
import { Banner } from "../../models/Banner/Banner";
import { StyledButton } from "../Button/Button";

export const CartQuantity = styled.div`
  display: flex;
  position: relative;
  background-color: var(--color-background-light-grey);
  max-width: 146px;
  height: 2rem;
  border-radius: var(--border-radius-small);
  overflow: hidden;
  border: 3px solid var(--color-background-light-grey);

  input {
    font-size: var(--font-size-text);
    font-weight: bold;
    text-align: center;
    opacity: 0.85;
    background-color: transparent;
    border: 0;
    padding: 0 0.5rem;
    width: 100%;
    flex-grow: 1;
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    &[type="number"] {
      -moz-appearance: textfield;
    }
  }
`;

export const ChangeQuantityButton = styled(StyledButton)`
  background: ${(props) => (props.primary ? "var(--cta-primary-background-hover)" : "var(--cta-background-hover)")};
  border: ${(props) => (props.primary ? "var(--cta-primary-border-hover)" : "var(--cta-border-hover)")};
  color: ${(props) => (props.primary ? "var(--cta-primary-text-color-hover)" : "var(--cta-text-color-hover)")};

  &:hover {
    background: ${(props) => (props.primary ? "var(--cta-primary-background)" : "var(--cta-background)")};
    border-radius: ${(props) => (props.primary ? "var(--cta-primary-border-radius)" : "var(--cta-border-radius)")};
    border: ${(props) => (props.primary ? "var(--cta-primary-border)" : "var(--cta-border)")};
    color: ${(props) => (props.primary ? "var(--cta-primary-text-color)" : "var(--cta-text-color)")};
  }
`;

interface Props {
  quantity: number;
  product: Banner;
  increase: (payload: Banner) => void;
  decrease: (payload: Banner) => void;
}

const QuantityButton: React.FC<Props> = ({ product, quantity, increase, decrease }) => {
  return (
    <CartQuantity>
      <ChangeQuantityButton onClick={() => decrease(product)}>-</ChangeQuantityButton>
      <input type="number" name="qtybutton" value={quantity} readOnly={true} />
      <ChangeQuantityButton onClick={() => increase(product)}>+</ChangeQuantityButton>
    </CartQuantity>
  );
};

export default QuantityButton;
