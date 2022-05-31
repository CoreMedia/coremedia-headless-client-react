import { gql } from "@apollo/client";
import { searchFacetValueFragment } from "./SearchFacetValue";

export const searchFacetFragment = gql`
  fragment SearchFacet on Facet {
    alias
    field
    values {
      ...SearchFacetValue
    }
  }
  ${searchFacetValueFragment}
`;
