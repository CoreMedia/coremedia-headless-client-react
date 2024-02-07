import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { Banner } from "../../models/Banner/Banner";
import { StyledButton } from "../Button/Button";
import { useCartContextState } from "../../context/CartContext";

interface Props {
  banner: Banner;
}

export const ShowNow = styled.div`
  overflow: hidden;
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  pointer-events: none;

  :before {
    display: block;
    padding-top: 150%;
    content: "";
  }
`;

const Button = styled(StyledButton)`
  font-family: var(--font-family-text);
  font-size: var(--font-size-text-small);
  background-color: hsla(0, 0%, 100%, 0.75);
  &:hover {
    background-color: (--color-background-light);
    color: var(--color-cta-font-hover);
  }
  &:active,
  &:focus {
    background-color: #fff;
    box-shadow:
      inset 0 0 0 1px hsla(0, 0%, 100%, 0.75),
      inset 0 0 0 2px #000;
  }
  position: absolute;
  bottom: 50%;
  right: 50%;
  transform: translate(50%, 50%);
  padding: 14px;
  color: #000;
  transition: all 0.1s ease;
  text-align: center;
`;

const ShopNowButton: React.FC<Props> = ({ banner }) => {
  const { t } = useTranslation();
  const { addProduct, cartItems, increase } = useCartContextState();
  const isInCart = (product: Banner) => {
    return !!cartItems.find((item) => item.id === product.metadata?.root.id);
  };
  return (
    <>
      {banner.shopNowConfiguration && (
        <ShowNow>
          {isInCart(banner) && (
            <Button onClick={() => increase(banner)}>
              <span>{t("Button.addMoreCart")}</span>
            </Button>
          )}
          {!isInCart(banner) && (
            <Button onClick={() => addProduct(banner)}>
              <span>{t("Button.addToCart")}</span>
            </Button>
          )}
        </ShowNow>
      )}
    </>
  );
};

export default ShopNowButton;
