import { gql } from "@apollo/client";
import { categoryFragment } from "./CategoryFragment";

export const externalChannelFragment = gql`
  fragment ExternalChannel on CMExternalChannel {
    ...Teasable
    category {
      ...Category
    }
  }
  ${categoryFragment}
`;
