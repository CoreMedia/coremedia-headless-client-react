import { gql } from "@apollo/client";
import { teasableForNavigationFragment } from "./TeasableForNavigationFragment";

export const CMProductForNavigationFragment = gql`
  fragment CMProductForNavigation on CMProduct {
    ...TeasableForNavigation
    productName
  }

  ${teasableForNavigationFragment}
`;
