import { gql } from "@apollo/client";

export const mediaFragment = gql`
  fragment Media on CMMedia {
    title
    detailText
    data {
      uri
    }
    alt
    id
  }
`;
