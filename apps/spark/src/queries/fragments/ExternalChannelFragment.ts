import { gql } from "@apollo/client";
import { categoryRefFragment } from "./CategoryRefFragment";

export const externalChannelFragment = gql`
  fragment ExternalChannel on CMExternalChannel {
    ...Teasable
    categoryRef {
      ...CategoryRef
    }
  }
  ${categoryRefFragment}
`;
