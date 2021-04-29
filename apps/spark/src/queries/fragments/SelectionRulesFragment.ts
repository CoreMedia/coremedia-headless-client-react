import { gql } from "@apollo/client";
import { teasableFragment } from "./TeasableFragment";
import { collectionFragment } from "./CollectionFragment";
import { videoFragment } from "./VideoFragment";
import { imageMapFragment } from "./ImageMapFragment";
import { productTeaserFragment } from "./ProductTeaserFragment";

export const selectionRulesFragment = gql`
  fragment SelectionRules on CMSelectionRules {
    defaultContent {
      ...Teasable
      ...Collection
      ...Video
      ...ImageMap
      ...ProductTeaser
    }
  }

  ${teasableFragment}
  ${collectionFragment}
  ${videoFragment}
  ${imageMapFragment}
  ${productTeaserFragment}
`;
