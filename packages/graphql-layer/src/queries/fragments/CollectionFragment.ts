import { gql } from "@apollo/client";
import { teasableFragment } from "./TeasableFragment";
import { productTeaserFragment } from "./ProductTeaserFragment";
import { imageMapFragment } from "./ImageMapFragment";
import { externalChannelFragment } from "./ExternalChannelFragment";
import { CMProductFragment } from "./CMProductFragment";
import { externalLinkFragment } from "./ExternalLinkFragment";
import { externalProductFragment } from "./ExternalProductFragment";
import { productRefFragment } from "./ProductRefFragment";
import { downloadFragment } from "./DownloadFragment";

export const collectionFragment = gql`
  fragment Collection on CMCollection {
    ...Teasable
    viewtype
    items {
      ...Teasable
      ...ProductTeaser
      ...ImageMap
      ...ExternalChannel
      ...CMProduct
      ...ExternalLink
      ...ProductRef
      ...ExternalProduct
      ...Download
    }
  }
  ${teasableFragment}
  ${productTeaserFragment}
  ${imageMapFragment}
  ${externalChannelFragment}
  ${CMProductFragment}
  ${externalLinkFragment}
  ${productRefFragment}
  ${externalProductFragment}
  ${downloadFragment}
`;
