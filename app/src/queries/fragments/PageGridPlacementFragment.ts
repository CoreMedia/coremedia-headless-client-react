import { gql } from "@apollo/client";
import { teasableFragment } from "./TeasableFragment";
import { collectionFragment } from "./CollectionFragment";
import { videoFragment } from "./VideoFragment";
import { imageMapFragment } from "./ImageMapFragment";
import { productTeaserFragment } from "./ProductTeaserFragment";
import { navigationFragment } from "./NavigationFragment";
import { externalChannelFragment } from "./ExternalChannelFragment";
import { selectionRulesFragment } from "./SelectionRulesFragment";

export const pageGridPlacementFragment = gql`
  fragment PageGridPlacement on PageGridPlacement {
    id
    name
    viewtype
    items {
      ...Teasable
      ...Collection
      ...Video
      ...ImageMap
      ...ProductTeaser
      ...ExternalChannel
      ...SelectionRules
      ... on CMNavigation {
        children {
          ...Teasable
          ...Navigation
          ...Collection
        }
      }
    }
  }
  ${teasableFragment}
  ${collectionFragment}
  ${videoFragment}
  ${imageMapFragment}
  ${productTeaserFragment}
  ${navigationFragment}
  ${externalChannelFragment}
  ${selectionRulesFragment}
`;
