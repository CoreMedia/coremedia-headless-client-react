import { gql } from "@apollo/client";
import { teasableFragment } from "./TeasableFragment";
import { productRefFragment } from "./ProductRefFragment";

export const productTeaserFragment = gql`
  fragment ProductTeaser on CMProductTeaser {
    ...Teasable
    productRef {
      ...ProductRef
    }
    shopNowSetting: settings(paths: ["shopNow"])
  }
  ${teasableFragment}
  ${productRefFragment}
`;
