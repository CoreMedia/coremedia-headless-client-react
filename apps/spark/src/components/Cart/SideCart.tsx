import React, { MouseEventHandler } from "react";
import { useTranslation } from "react-i18next";
import styled, { css } from "styled-components";
import Button from "../Button/Button";
import { useSiteContextState } from "../../context/SiteContextProvider";
import CartList from "./CartList";

interface Props {
  isShowing: boolean;
  hide: MouseEventHandler;
}

const StyledCart = styled.div<{ isShowing: boolean }>`
  position: fixed;
  top: 0;
  width: 420px;
  padding: 110px 50px 50px;
  min-height: 100vh;
  bottom: 0;
  z-index: 99999;
  right: 0;
  visibility: hidden;
  opacity: 0;
  transition: all 0.25s ease-in;
  transform: translate(200px);
  box-shadow: 0 0 87px 0 rgb(0 0 0 / 9%);
  background-color: #f2f2f2;

  ${(props) =>
    props.isShowing &&
    css`
      visibility: visible;
      opacity: 1;
      transform: translate(0);
    `}
`;

const CartHeader = styled.div`
  button {
    position: absolute;
    top: 55px;
    right: 50px;
    font-size: 25px;
    line-height: 30px;
    transition: all 0.25s ease-out;
  }
`;

const SideCart: React.FC<Props> = ({ isShowing, hide }) => {
  const { rootSegment } = useSiteContextState();
  const { t } = useTranslation();
  return (
    <StyledCart isShowing={isShowing}>
      <CartHeader>
        <h2>{t("SideCart.title")}</h2>
        <button type="button" data-dismiss="modal" aria-label={t("SideCart.close")} onClick={hide}>
          <span aria-hidden="true">&times;</span>
        </button>
      </CartHeader>
      <CartList />
      <Button
        text={t("SideCart.openCartButtonText")}
        linkTarget={`/${rootSegment}/cart`}
        openInNewTab={false}
        externalLink={false}
      />
    </StyledCart>
  );
};

export default SideCart;
