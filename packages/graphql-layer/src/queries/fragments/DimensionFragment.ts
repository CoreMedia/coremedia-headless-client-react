import { gql } from "@apollo/client";

export const dimensionFragment = gql`
  fragment Dimension on Dimension {
    width
    height
  }
`;
