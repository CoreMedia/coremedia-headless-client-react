import { gql } from "@apollo/client";
import { teasableFragment } from "./TeasableFragment";
import { productFragment } from "./ProductFragment";

export const productTeaserFragment = gql`
  fragment ProductTeaser on CMProductTeaser {
    ...Teasable
    product {
      ...Product
    }
    shopNowSetting: settings(paths: ["shopNow"])
  }
  ${teasableFragment}
  ${productFragment}
`;
