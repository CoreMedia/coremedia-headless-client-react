import { gql } from "@apollo/client";
import { teasableFragment } from "./TeasableFragment";
import { productRefFragment } from "./ProductRefFragment";

export const externalProductFragment = gql`
  fragment ExternalProduct on CMExternalProduct {
    ...Teasable
    productRef {
      ...ProductRef
    }
    shopNowSetting: settings(paths: ["shopNow"])
  }
  ${teasableFragment}
  ${productRefFragment}
`;
