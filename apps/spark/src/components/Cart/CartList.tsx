import React from "react";
import { useTranslation } from "react-i18next";
import styled, { css } from "styled-components";
import { useCartContextState } from "../../context/CartContext";
import ProductPricing from "../Product/ProductPricing";
import { metaDataProperty } from "../../utils/Preview/MetaData";
import Link from "../Link/Link";
import Image from "../Media/Image";

const Cart = styled.div``;
const EmptyCart = styled.div`
  margin-bottom: 8px;
  width: 200px;
  padding: 12px 0;
  border-bottom: 1px solid #eeeeee;
`;
const CartItem = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid #eeeeee;
  margin-bottom: 10px;
  display: flex;
`;
const ItemPicture = styled.div`
  flex: 0 0 60px;
`;
const ItemProperties = styled.div`
  padding-left: 10px;
  flex: 2;
`;
const ItemRemove = styled.div`
  flex: 0;
  cursor: pointer;
`;
const Property = styled.div<{ hideName: boolean }>`
  > div {
    display: inline-block;
    font-size: var(--font-size-text-small);

    > a {
      color: #000;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  ${(props) =>
    props.hideName &&
    css`
      > div:first-child {
        border: 0;
        clip: rect(0 0 0 0);
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
        width: 1px;
      }
    `}
`;
const TitleProperty = styled(Property)`
  font-size: var(--font-size-text-small);
  margin-bottom: 6px;
`;
const DescriptionProperty = styled(Property)`
  display: none;
`;
const QuantityProperty = styled(Property)``;
const PriceProperty = styled(Property)`
  display: inline-block;
  float: right;
  padding-right: 20px;
`;
const CartList: React.FC = () => {
  const { cartItems, itemCount, removeProduct } = useCartContextState();
  const { t } = useTranslation();
  return (
    <Cart>
      {itemCount === 0 && <EmptyCart>{t("CartList.emptyText")}</EmptyCart>}
      {itemCount > 0 && (
        <div>
          {cartItems.map((item, index) => {
            return (
              <CartItem key={index}>
                {item.product.picture && (
                  <ItemPicture {...metaDataProperty(item.product.metadata?.properties?.picture)}>
                    <Image picture={item.product.picture} cropName="portrait_ratio1x1" width={200} />
                  </ItemPicture>
                )}
                <ItemProperties>
                  <TitleProperty hideName={true}>
                    <div>{t("CartList.product")}</div>
                    <div>
                      <Link to={item.product.linkTarget}>{item.product.title}</Link>
                    </div>
                  </TitleProperty>
                  <QuantityProperty hideName={false}>
                    <div>{t("CartList.quantity")}</div>
                    <div>{item.quantity}</div>
                  </QuantityProperty>
                  <PriceProperty hideName={true}>
                    <div>{t("CartList.price")}</div>
                    <div>
                      <ProductPricing {...item.product} />
                    </div>
                  </PriceProperty>
                  <DescriptionProperty hideName={true}>
                    <div>{t("CartList.description")}</div>
                    <div>{item.product.text}</div>
                  </DescriptionProperty>
                </ItemProperties>
                <ItemRemove>
                  {item.quantity > 0 && (
                    <span
                      aria-hidden="true"
                      onClick={() => {
                        removeProduct(item.product);
                      }}
                    >
                      &times;
                    </span>
                  )}
                </ItemRemove>
              </CartItem>
            );
          })}
        </div>
      )}
    </Cart>
  );
};

export default CartList;
