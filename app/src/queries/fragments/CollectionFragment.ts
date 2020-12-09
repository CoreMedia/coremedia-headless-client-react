import { gql } from "@apollo/client";
import { teasableFragment } from "./TeasableFragment";
import { productTeaserFragment } from "./ProductTeaserFragment";
import { imageMapFragment } from "./ImageMapFragment";
import { productFragment } from "./ProductFragment";
import { externalChannelFragment } from "./ExternalChannelFragment";

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
    }
  }
  ${teasableFragment}
  ${productTeaserFragment}
  ${imageMapFragment}
  ${productFragment}
  ${externalChannelFragment}
`;
