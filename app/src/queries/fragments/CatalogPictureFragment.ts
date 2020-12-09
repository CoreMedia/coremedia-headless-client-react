import { gql } from "@apollo/client";

export const catalogPictureFragment = gql`
  fragment CatalogPicture on CatalogPicture {
    url
  }
`;
