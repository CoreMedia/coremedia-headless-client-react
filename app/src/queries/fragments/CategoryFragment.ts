import { gql } from "@apollo/client";
import { pictureFragment } from "./PictureFragment";

export const categoryFragment = gql`
  fragment Category on Category {
    id
    shortId
    name
    breadcrumb {
      name
    }
    picture {
      ...Picture
    }
  }
  ${pictureFragment}
`;
