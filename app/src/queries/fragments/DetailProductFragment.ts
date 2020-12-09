import { gql } from "@apollo/client";
import { pictureFragment } from "./PictureFragment";
import { productFragment } from "./ProductFragment";

export const detailProductFragment = gql`
  fragment DetailProduct on Product {
    ...Product
    longDescription
    pictures {
      ...Picture
    }
  }
  ${productFragment}
  ${pictureFragment}
`;
