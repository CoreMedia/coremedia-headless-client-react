import { gql } from "@apollo/client";
import { detailTeasableFragment } from "./DetailTeasableFragment";
import { teasableFragment } from "./TeasableFragment";

export const detailCMProductFragment = gql`
  fragment DetailCMProduct on CMProduct {
    ...DetailTeasable
    productName
    productCode
    downloads {
      ...Teasable
    }
  }

  ${detailTeasableFragment}
  ${teasableFragment}
`;
