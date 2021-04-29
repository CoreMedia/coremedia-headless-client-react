import { gql } from "@apollo/client";
import { pictureFragment } from "./PictureFragment";

export const productFragment = gql`
  fragment Product on Product {
    id
    siteId
    name
    shortDescription
    offerPrice
    listPrice
    currency
    locale
    seoSegment
    externalId
    shortId
    category {
      breadcrumb {
        name
      }
    }
    augmentation {
      picture {
        ...Picture
      }
    }
  }
  ${pictureFragment}
`;
