import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import styled, { css } from "styled-components";
import { Helmet } from "react-helmet-async";
import { useCartContextState } from "../../context/CartContext";
import Link from "../Link/Link";
import ProductPricing, { formatPrice } from "../Product/ProductPricing";
import { metaDataProperty } from "../../utils/Preview/MetaData";
import Image, { StyledImage } from "../Media/Image";
import Button, { StyledButton } from "../Button/Button";
import { Headline } from "../Details/Detail";
import { StyledCol } from "../PageGrid/Col";
import QuantityButton, { CartQuantity } from "../Product/QuantityButton";
import { useSiteContextState } from "../../context/SiteContextProvider";
import BasketIcon from "./assets/basket.svg";

const Cart = styled.div`
  display: flex;

  > div {
  }
`;

const EmptyCart = styled.div`
  text-align: center;
`;

const CartProducts = styled.div`
  flex: 2;
  padding-right: 12px;

  table {
    border-collapse: collapse;

    thead {
      height: 3em;
      th {
        &:nth-child(3) {
          text-align: start;
        }
      }
    }

    tbody > tr {
      border-bottom: 1px solid var(--color-background-light-grey);

      &:last-child {
        border: none;
      }

      th {
        text-align: center;
      }

      td {
        font-size: 14px;
        padding: 0.5em 0.5em 1em 0;

        @media only screen and (max-width: 767px) {
          padding: 30px 12px 30px 12px;
        }

        // remove btn
        :first-child {
          ${StyledButton} {
            padding: 0 8px;
            aspect-ratio: 1/1;
            border-color: transparent;
          }
        }

        // product thumbnail
        :nth-child(2) {
          width: 150px;
          aspect-ratio: 1/1;

          ${StyledImage} {
            border-radius: var(--border-radius-small);
          }
        }

        // product name
        :nth-child(3) {
          width: 340px;
          font-family: var(--font-family-headline);
          font-size: var(--font-size-heading-3);

          a {
            text-decoration: none;

            &:hover {
              text-decoration: underline;
            }
          }
        }

        // price
        :nth-child(4) {
          width: 100px;
          text-align: end;
        }

        // quantity
        :nth-child(5) {
          width: 150px;
          ${CartQuantity} {
            min-width: 130px;
          }
        }

        // total
        :last-child {
          width: 100px;
          text-align: end;

          span {
            color: #262626;
            font-size: 16px;
          }
        }
      }
    }
  }
`;
const CartCheckout = styled.div`
  flex: 1;
  background: #f9f9f9;
  padding: 30px;

  h2 {
    margin-top: 0;
  }

  > div {
    & > * {
      flex: 1;
    }
  }
`;

const CartContent = styled.div<{ addBorder?: boolean }>`
  display: flex;
  ${(props) =>
    props.addBorder && props.addBorder === true
      ? css`
          border-top: 1px solid #dbdbdb;
          padding: 20px 0 0 0;
          margin: 20px 0 37px 0;
        `
      : css`
          margin: 24px 0 6px;
        `}
`;

const DetailedCart: React.FC = () => {
  const { rootSegment, cmecConfig } = useSiteContextState();
  const { cartItems, itemCount, increase, decrease, removeProduct, total, hideSideCart } = useCartContextState();
  const { t } = useTranslation();

  useEffect(() => {
    hideSideCart();
  }, []);

  // cmec extra metrics
  const cmecPageData = `var bysideWebcare_content_unavailable = new Date().getTime();`;

  return (
    <StyledCol zone={"main"}>
      {!!cmecConfig && (
        <Helmet>
          <script>{cmecPageData}</script>
        </Helmet>
      )}
      <Headline>{t("DetailedCart.headline")}</Headline>
      {itemCount === 0 && (
        <EmptyCart>
          <img src={BasketIcon} alt="" style={{ height: "15vw" }} />
          <p>{t("DetailedCart.emptyText")}</p>
          <Button linkTarget="/" text={t("DetailedCart.continueShopping")} />
        </EmptyCart>
      )}
      {itemCount > 0 && (
        <Cart>
          <CartProducts>
            <table className={`cm-cart__table`}>
              <thead>
                <tr>
                  <th />
                  <th />
                  <th>{t("DetailedCart.description")}</th>
                  <th>{t("DetailedCart.price")}</th>
                  <th>{t("DetailedCart.quantity")}</th>
                  <th>{t("DetailedCart.total")}</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <div>
                          <StyledButton onClick={() => removeProduct(item.product)}>&times;</StyledButton>
                        </div>
                      </td>
                      <td>
                        <Link to={item.product.linkTarget}>
                          <div
                            className={`cm-cart-item__picture`}
                            {...metaDataProperty(item.product.metadata?.properties?.picture)}
                          >
                            {item.product.picture && (
                              <Image picture={item.product.picture} cropName="portrait_ratio1x1" width={200} />
                            )}
                          </div>
                        </Link>
                      </td>
                      <td>
                        <Link to={item.product.linkTarget}>{item.product.title}</Link>
                        {/* <b>Size: 34</b>
                          <span> M0E20000000EOCT </span>*/}
                      </td>
                      <td>
                        <ProductPricing {...item.product} />
                      </td>
                      <td>
                        <QuantityButton
                          product={item.product}
                          quantity={item.quantity}
                          increase={increase}
                          decrease={decrease}
                        />
                      </td>
                      <td>
                        {item.product &&
                          item.product.currency &&
                          item.product.locale &&
                          formatPrice(
                            (item.product.offerPrice || item.product.listPrice) * item.quantity,
                            item.product.currency,
                            item.product.locale
                          )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CartProducts>
          <CartCheckout className={`cm-cart__checkout`}>
            <h2>{t("DetailedCart.cartTotals")}</h2>
            <CartContent>
              <span>{t("DetailedCart.subtotalInclTax")}</span>
              <span>
                {cartItems[0].product.currency &&
                  cartItems[0].product.locale &&
                  formatPrice(total, cartItems[0].product.currency, cartItems[0].product.locale)}
              </span>
            </CartContent>
            <CartContent style={{ opacity: 0.5 }}>
              <span>{t("DetailedCart.tax")}</span>
              <span>
                {cartItems[0].product.currency &&
                  cartItems[0].product.locale &&
                  formatPrice(total * 0.19, cartItems[0].product.currency, cartItems[0].product.locale)}
              </span>
            </CartContent>
            <CartContent addBorder={true}>
              <b>{t("DetailedCart.total")}</b>
              <span>
                {cartItems[0].product.currency &&
                  cartItems[0].product.locale &&
                  formatPrice(total, cartItems[0].product.currency, cartItems[0].product.locale)}
              </span>
            </CartContent>
            <Button
              text={t("DetailedCart.checkoutButtonText")}
              linkTarget={`/${rootSegment}/checkout`}
              openInNewTab={false}
              externalLink={false}
            />
          </CartCheckout>
        </Cart>
      )}
    </StyledCol>
  );
};

export default DetailedCart;
