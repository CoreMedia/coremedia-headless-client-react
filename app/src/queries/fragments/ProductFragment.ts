import { gql } from "@apollo/client";
import { pictureFragment } from "./PictureFragment";
import { catalogPictureFragment } from "./CatalogPictureFragment";

export const productFragment = gql`
  fragment Product on Product {
    id
    name
    shortDescription
    offerPrice
    listPrice
    currency
    locale
    seoSegment
    shortId
    category {
      breadcrumb {
        name
      }
    }
    catalogPicture {
      ...CatalogPicture
    }
    picture {
      ...Picture
    }
  }
  ${pictureFragment}
  ${catalogPictureFragment}
`;
