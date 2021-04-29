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
    }
    augmentation {
      __typename
      picture {
        ...Picture
      }
    }
  }
`;
