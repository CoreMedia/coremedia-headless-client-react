import { gql } from "@apollo/client";

export const searchFacetValueFragment = gql`
  fragment SearchFacetValue on FacetValue {
    value
    query
    hitCount
  }
`;
