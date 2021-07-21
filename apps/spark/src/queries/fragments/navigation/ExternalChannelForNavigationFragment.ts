import { gql } from "@apollo/client";
import { teasableForNavigationFragment } from "./TeasableForNavigationFragment";
import { categoryRefFragment } from "../CategoryRefFragment";

export const externalChannelForNavigationFragment = gql`
  fragment ExternalChannelForNavigation on CMExternalChannel {
    ...TeasableForNavigation
    categoryRef {
      ...CategoryRef
    }
  }
  ${teasableForNavigationFragment}
  ${categoryRefFragment}
`;
