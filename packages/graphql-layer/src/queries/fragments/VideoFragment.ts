import { gql } from "@apollo/client";
import { mediaFragment } from "./MediaFragment";

export const videoFragment = gql`
  fragment Video on CMVideo {
    ...Media
    dataUrl
    settings(paths: "playerSettings")
  }

  ${mediaFragment}
`;
