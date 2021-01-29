import { gql } from "@apollo/client";

export const externalLinkAsLinkableFragment = gql`
  fragment ExternalLinkAsLinkable on CMExternalLink {
    ...Linkable
    url
    openInNewTab
  }
`;
