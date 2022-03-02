import { gql } from "@apollo/client";

export const categoryFragment = gql`
  fragment Category on Category {
    id
    siteId
    externalId
    shortId
    name
    breadcrumb {
      name
      externalId
    }
    augmentation {
      __typename
      picture {
        ...Picture
      }
    }
  }
`;
