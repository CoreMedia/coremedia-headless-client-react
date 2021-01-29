import { gql } from "@apollo/client";
import { teasableFragment } from "./TeasableFragment";
import { productTeaserFragment } from "./ProductTeaserFragment";
import { imageMapFragment } from "./ImageMapFragment";
import { productFragment } from "./ProductFragment";
import { externalChannelFragment } from "./ExternalChannelFragment";
import { CMProductFragment } from "./CMProductFragment";
import { externalLinkFragment } from "./ExternalLinkFragment";

export const collectionFragment = gql`
  fragment Collection on CMCollection {
    ...Teasable
    viewtype
    items {
      ...Teasable
      ...ProductTeaser
      ...ImageMap
      ...Product
      ...ExternalChannel
      ...CMProduct
      ...ExternalLink
    }
  }
  ${teasableFragment}
  ${productTeaserFragment}
  ${imageMapFragment}
  ${productFragment}
  ${externalChannelFragment}
  ${CMProductFragment}
  ${externalLinkFragment}
`;
