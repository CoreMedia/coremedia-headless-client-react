import React, { useEffect } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useCartContextState } from "../../context/CartContext";
import Button from "../Button/Button";
import { StyledCol } from "../PageGrid/Col";
import { useSiteContextState } from "../../context/SiteContextProvider";
import CheckoutSuccessIcon from "./assets/checkout-success.svg";

export const StyledAlert = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  flex-grow: 1;
  width: 100%;

  img {
    height: 15vw;
  }

  h1 {
    margin-top: 0;
    font-size: var(--font-size-heading-1);
  }

  p {
    max-height: 25vh;
    overflow: auto;
  }
`;

const CheckoutPage: React.FC = () => {
  const { itemCount, handleCheckout } = useCartContextState();
  const { t } = useTranslation();
  const { rootSegment } = useSiteContextState();

  useEffect(() => {
    itemCount > 0 && handleCheckout();
  }, []);

  return (
    <StyledCol zone="main" style={{ textAlign: "center" }}>
      <StyledAlert>
        <img src={CheckoutSuccessIcon} alt="" />
        <h1>{t("CheckoutPage.successTitle")}</h1>
        <div dangerouslySetInnerHTML={{ __html: t("CheckoutPage.successMessage") }}></div>
        <div>
          <Button linkTarget={"/" + rootSegment} text={t("CheckoutPage.continueShopping")} />
        </div>
      </StyledAlert>
    </StyledCol>
  );
};

export default CheckoutPage;
