import React from "react";
import styled, { css } from "styled-components";
import { Banner } from "../../models/Banner/Banner";

export const formatPrice = (price: number | null, currency: string | null, locale: string | null): string | null => {
  if (price && currency) {
    return new Intl.NumberFormat(locale?.replace("_", "-"), {
      style: "currency",
      currency: currency,
    }).format(price);
  }
  return null;
};

interface Props extends Banner {
  showListPrice?: boolean;
  showOfferPrice?: boolean;
}

export const StyledPricing = styled.div``;
export const Price = styled.div`
  font-size: var(--font-size-text-small);
  line-height: var(--line-height);

  + div {
    margin-left: 8px;
  }
`;
export const ListPrice = styled(Price)<{ showOfferPrice: boolean }>`
  display: inline-block;
  ${(props) =>
    props.showOfferPrice &&
    css`
      text-decoration: line-through;
    `};
`;
export const OfferPrice = styled(Price)`
  display: inline-block;
`;

const ProductPricing: React.FC<Props> = ({
  currency,
  locale,
  listPrice,
  offerPrice,
  showListPrice = true,
  showOfferPrice = true,
}) => {
  let listPriceFormatted: string | null = null;
  let offerPriceFormatted: string | null = null;
  if (currency && locale) {
    if (listPrice) {
      listPriceFormatted = formatPrice(listPrice, currency, locale);
    }
    if (offerPrice) {
      offerPriceFormatted = formatPrice(offerPrice, currency, locale);
    }
  }

  showListPrice = showListPrice && listPriceFormatted !== null;
  showOfferPrice = showOfferPrice && offerPriceFormatted !== null && (!showListPrice || offerPrice !== listPrice);
  return (
    <StyledPricing>
      {showOfferPrice && <OfferPrice>{offerPriceFormatted}</OfferPrice>}
      {showListPrice && <ListPrice showOfferPrice={showOfferPrice}>{listPriceFormatted}</ListPrice>}
    </StyledPricing>
  );
};
export default ProductPricing;
