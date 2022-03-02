import { gql } from "@apollo/client";

export const CMHTMLFragment = gql`
  fragment CMHTMLFragment on CMHTML {
    id
    teaserTitle
    type
    description
    html
  }
`;
