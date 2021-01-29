import { gql } from "@apollo/client";
import { linkableFragment } from "./LinkableFragment";
import { categoryFragment } from "./CategoryFragment";
import { externalLinkAsLinkableFragment } from "./ExternalLinkAsLinkableFragment";

export const teaserTargetFragment = gql`
  fragment TeaserTarget on ExtendedTeaserTarget {
    target {
      ...Linkable
      ...ExternalLinkAsLinkable
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
  ${externalLinkAsLinkableFragment}
`;
