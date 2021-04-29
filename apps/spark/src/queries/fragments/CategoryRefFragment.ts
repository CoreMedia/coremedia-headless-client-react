import { gql } from "@apollo/client";
import { categoryFragment } from "./CategoryFragment";

export const categoryRefFragment = gql`
  fragment CategoryRef on CategoryRef {
    siteId
    storeId
    locale
    externalId
    category {
      ...Category
      __typename
    }
    __typename
  }
  ${categoryFragment}
`;
