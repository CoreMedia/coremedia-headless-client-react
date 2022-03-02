import { gql } from "@apollo/client";
import { teasableFragment } from "./TeasableFragment";

export const externalLinkFragment = gql`
  fragment ExternalLink on CMExternalLink {
    ...Teasable
    url
    openInNewTab
  }

  ${teasableFragment}
`;
