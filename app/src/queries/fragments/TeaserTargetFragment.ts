import { gql } from "@apollo/client";
import { linkableFragment } from "./LinkableFragment";
import { categoryFragment } from "./CategoryFragment";

export const teaserTargetFragment = gql`
  fragment TeaserTarget on ExtendedTeaserTarget {
    target {
      ...Linkable
      ... on CMExternalChannel {
        category {
          ...Category
        }
      }
    }
    callToActionEnabled
    callToActionText
  }
  ${linkableFragment}
  ${categoryFragment}
`;
