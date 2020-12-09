import { gql } from "@apollo/client";
import { teasableFragment } from "./TeasableFragment";

export const CMProductFragment = gql`
  fragment CMProduct on CMProduct {
    ...Teasable
    productName
  }

  ${teasableFragment}
`;
