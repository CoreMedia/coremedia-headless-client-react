import { gql } from "@apollo/client";
import { productFragment } from "./ProductFragment";

export const productRefFragment = gql`
  fragment ProductRef on ProductRef {
    siteId
    storeId
    locale
    externalId
    product {
      ...Product
      __typename
    }
    __typename
  }
  ${productFragment}
`;
