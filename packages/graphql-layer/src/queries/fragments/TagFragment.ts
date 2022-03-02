import { gql } from "@apollo/client";
import { linkableFragment } from "./LinkableFragment";
import { pictureFragment } from "./PictureFragment";
import { teasableOverlayFragment } from "./TeasableOverlayFragment";
import { teaserTargetFragment } from "./TeaserTargetFragment";
import { personFragment } from "./PersonFragment";

export const tagFragment = gql`
  fragment Tag on CMTaxonomy {
    ...Linkable
    value
    navigationPath {
      segment
      id
      title
      ... on CMTaxonomy {
        value
      }
    }
  }
  ${linkableFragment}
  ${pictureFragment}
  ${teasableOverlayFragment}
  ${teaserTargetFragment}
  ${personFragment}
`;
