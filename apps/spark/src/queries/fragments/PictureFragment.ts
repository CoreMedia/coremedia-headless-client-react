import { gql } from "@apollo/client";
import { mediaFragment } from "./MediaFragment";

export const pictureFragment = gql`
  fragment Picture on CMPicture {
    ...Media
    uriTemplate
  }
  ${mediaFragment}
`;
