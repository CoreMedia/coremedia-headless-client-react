import React, { useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { DetailProduct } from "../../models/Detail/DetailProduct";
import { useCartContextState } from "../../context/CartContext";
import { Banner } from "../../models/Banner/Banner";
import { StyledButton } from "../Button/Button";
import WishIconOutline from "./assets/wish-outline.svg";
import WishIconSolid from "./assets/wish-solid.svg";
import QuantityButton, { CartQuantity, ChangeQuantityButton } from "./QuantityButton";

interface Props {
  product: DetailProduct;
}

const StyledActions = styled.div`
  display: flex;
  grid-gap: 1em;
  gap: 1em;
  margin: var(--padding-medium) 0;

  ${CartQuantity} {
    ${ChangeQuantityButton} {
      width: 45px;
    }
  }
`;

const StyledAddToCartButton = styled(StyledButton)`
  flex: 1;
`;

const StyledWishlistButton = styled(StyledButton)`
  flex: none !important;
  aspect-ratio: 1/1;
  font-size: 0 !important;

  > span {
    width: 1.5rem;
    display: flex;
    margin: 0 auto;
    background: url(${WishIconOutline}) no-repeat 50% transparent;
    height: 100%;
  }

  &:hover {
    > span {
      background: url(${WishIconSolid}) no-repeat 50% transparent;
    }
  }
`;

const ProductActions: React.FC<Props> = ({ product }) => {
  const { addProduct, cartItems, increase } = useCartContextState();
  const { t } = useTranslation();

  const isInCart = (product: Banner) => {
    return !!cartItems.find((item) => item.id === product?.metadata?.root.id);
  };

  const [quantity, setQuantity] = useState<number>(1);

  const inc = () => {
    setQuantity(quantity + 1);
  };

  const dec = () => {
    setQuantity(quantity - 1);
  };
  return (
    <>
      <StyledActions style={{ flexDirection: "column" }}>
        <label>Quantity</label>
        <QuantityButton product={product} quantity={quantity} increase={inc} decrease={dec} />
      </StyledActions>
      <StyledActions>
        {isInCart(product) && (
          <StyledAddToCartButton primary={true} onClick={() => increase(product)}>
            {t("Button.addMoreCart")}
          </StyledAddToCartButton>
        )}
        {!isInCart(product) && (
          <StyledAddToCartButton primary={true} onClick={() => addProduct(product)}>
            {t("Button.addToCart")}
          </StyledAddToCartButton>
        )}
        <StyledWishlistButton>
          <span />
        </StyledWishlistButton>
      </StyledActions>
    </>
  );
};

export default ProductActions;
