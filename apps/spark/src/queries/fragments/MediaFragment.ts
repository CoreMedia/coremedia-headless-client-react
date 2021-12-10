import { gql } from "@apollo/client";

export const mediaFragment = gql`
  fragment Media on CMMedia {
    title
    data {
      uri
    }
    alt
    id
  }
`;
