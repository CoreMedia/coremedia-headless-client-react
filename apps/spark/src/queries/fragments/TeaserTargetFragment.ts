import { gql } from "@apollo/client";
import { linkableFragment } from "./LinkableFragment";
import { categoryRefFragment } from "./CategoryRefFragment";
import { externalLinkAsLinkableFragment } from "./ExternalLinkAsLinkableFragment";
import { productRefFragment } from "./ProductRefFragment";

export const teaserTargetFragment = gql`
  fragment TeaserTarget on ExtendedTeaserTarget {
    target {
      ...Linkable
      ...ExternalLinkAsLinkable
      ... on CMExternalChannel {
        categoryRef {
          ...CategoryRef
        }
      }
      ... on CMProductTeaser {
        productRef {
          ...ProductRef
        }
      }
    }
    callToActionEnabled
    callToActionText
  }
  ${linkableFragment}
  ${categoryRefFragment}
  ${productRefFragment}
  ${externalLinkAsLinkableFragment}
`;
