import { gql } from "@apollo/client";
import { teasableFragment } from "./TeasableFragment";
import { collectionFragment } from "./CollectionFragment";
import { imageMapFragment } from "./ImageMapFragment";
import { productTeaserFragment } from "./ProductTeaserFragment";
import { externalChannelFragment } from "./ExternalChannelFragment";
import { selectionRulesFragment } from "./SelectionRulesFragment";
import { CMProductFragment } from "./CMProductFragment";
import { externalLinkFragment } from "./ExternalLinkFragment";
import { CMHTMLFragment } from "./CMHTMLFragment";
import { externalProductFragment } from "./ExternalProductFragment";
import { downloadFragment } from "./DownloadFragment";
import { videoFragment } from "./VideoFragment";
import { timeLineFragment } from "./TimeLineFragment";
import { navigationFragment } from "./NavigationFragment";

export const pageGridPlacementFragment = gql`
  fragment PageGridPlacement on PageGridPlacement {
    id
    name
    viewtype
    items {
      ...Teasable
      ...Collection
      ...Video
      ... on CMVideo {
        viewtype
        timeLine {
          ...TimeLine
        }
      }
      ...ImageMap
      ...ProductTeaser
      ...ExternalChannel
      ...SelectionRules
      ...CMProduct
      ...ExternalLink
      ...CMHTMLFragment
      ...ExternalProduct
      ...Download
      #Navigation Fragment is required to load children when being placed in footer or footer-navigation
      ... on CMNavigation {
        children {
          ...Teasable
          ...Navigation
          ...Collection
          ...CMProduct
          ...ExternalLink
        }
      }
    }
  }
  ${teasableFragment}
  ${timeLineFragment}
  ${collectionFragment}
  ${videoFragment}
  ${imageMapFragment}
  ${productTeaserFragment}
  ${externalChannelFragment}
  ${selectionRulesFragment}
  ${CMProductFragment}
  ${externalLinkFragment}
  ${CMHTMLFragment}
  ${externalProductFragment}
  ${downloadFragment}
  ${navigationFragment}
`;
