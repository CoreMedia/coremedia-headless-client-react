import { gql } from "@apollo/client";

export const linkableFragment = gql`
  fragment Linkable on CMLinkable {
    title
    id
    segment
    navigationPath {
      segment
      id
      title
    }
  }
`;
