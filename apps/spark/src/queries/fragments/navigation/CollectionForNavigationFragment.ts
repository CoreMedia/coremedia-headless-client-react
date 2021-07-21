import { gql } from "@apollo/client";
import { productTeaserFragment } from "../ProductTeaserFragment";
import { externalChannelFragment } from "../ExternalChannelFragment";
import { externalLinkFragment } from "../ExternalLinkFragment";
import { productRefFragment } from "../ProductRefFragment";
import { externalProductFragment } from "../ExternalProductFragment";
import { teasableForNavigationFragment } from "./TeasableForNavigationFragment";
import { CMProductForNavigationFragment } from "./CMProductForNavigationFragment";

export const collectionForNavigationFragment = gql`
  fragment CollectionForNavigation on CMCollection {
    ...TeasableForNavigation
    viewtype
    items {
      ...TeasableForNavigation
      ...ExternalChannelForNavigation
      ...CMProductForNavigation
      ...ExternalLink
      ...ProductRef
      ...ExternalProduct
    }
  }
  ${teasableForNavigationFragment}
  ${productTeaserFragment}
  ${externalChannelFragment}
  ${CMProductForNavigationFragment}
  ${externalLinkFragment}
  ${productRefFragment}
  ${externalProductFragment}
`;
