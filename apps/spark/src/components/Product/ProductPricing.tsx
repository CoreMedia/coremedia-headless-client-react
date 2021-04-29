import React from "react";
import { ProductBanner } from "../../models/Banner/ProductBanner";

export const formatPrice = (price: number | null, currency: string | null, locale: string | null): string | null => {
  if (price && currency) {
    return new Intl.NumberFormat(locale?.replace("_", "-"), {
      style: "currency",
      currency: currency,
    }).format(price);
  }
  return null;
};

interface Props extends ProductBanner {
  showListPrice?: boolean;
  showOfferPrice?: boolean;
  classListPrice?: string;
  classOfferPrice?: string;
}

const ProductPricing: React.FC<Props> = ({
  currency,
  locale,
  listPrice,
  offerPrice,
  showListPrice = true,
  showOfferPrice = true,
  classListPrice = "",
  classOfferPrice = "",
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
    <div className={`cm-pricing`}>
      {showOfferPrice && <div className={`cm-price ${classOfferPrice}`}>{offerPriceFormatted}</div>}
      {showListPrice && (
        <div className={`cm-price ${classListPrice} ${showOfferPrice ? " cm-price--old" : ""}`}>
          {listPriceFormatted}
        </div>
      )}
    </div>
  );
};
export default ProductPricing;
