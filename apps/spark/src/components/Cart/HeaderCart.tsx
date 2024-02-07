import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useCartContextState } from "../../context/CartContext";
import { useSiteContextState } from "../../context/SiteContextProvider";

const Cart = styled.div`
  position: relative;
  box-sizing: border-box;
  margin-left: 10px;
  // make sure that the badge is inside the box
  padding-top: 10px;
  padding-right: 10px;
  // always occupy space as the cart is a dynamic fragment and will be added to the
  // DOM with small delay which would cause the header to be realigned otherwise
  width: 28px;

  @media screen and (min-width: 1200px) {
    order: 4;
    margin-left: 15px;
  }

  > div {
    display: inline-block;
    box-sizing: border-box;
    color: #373737;
    text-decoration: none;
    vertical-align: middle;
    width: 18px;
    height: 16px;
    border: 1px solid #000;
    border-radius: 0 0 3px 3px;
    background-color: #fff;
    position: relative;
    margin: 0;

    &:hover,
    &:focus {
      text-decoration: none;
      cursor: pointer;
    }

    &:before {
      content: "";
      display: block;
      box-sizing: border-box;
      width: 14px;
      height: 7px;
      border-top-left-radius: 50%;
      border-top-right-radius: 50%;
      border: 2px solid #000;
      border-bottom: 0;
      position: absolute;
      left: 1px;
      top: -8px;
    }

    span {
      box-sizing: border-box;
      font-size: 12px;
      line-height: 15px;
      font-weight: bold;
      border: 1px solid #000;
      border-radius: 50%;
      text-align: center;
      background-color: #fff;
      position: relative;
      display: block;
      width: 18px;
      height: 18px;
      top: -12px;
      right: -6px;
    }
  }
`;

const HeaderCart: React.FC = () => {
  const { itemCount, toggleSideCart } = useCartContextState();
  const { isCommerce } = useSiteContextState();
  const { t } = useTranslation();
  return (
    <>
      {isCommerce && (
        <Cart>
          <div className="cm-icon--cart">
            <div
              onClick={toggleSideCart}
              title={t("HeaderCart.title")}
              className="cm-cart-icon"
              aria-label={t("HeaderCart.title")}
            >
              <span className="cm-cart-icon__badge" data-cm-cart-badge="">
                {itemCount}
              </span>
            </div>
          </div>
        </Cart>
      )}
    </>
  );
};

export default HeaderCart;
