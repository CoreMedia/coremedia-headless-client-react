import { gql } from "@apollo/client";
import { teasableFragment } from "./fragments/TeasableFragment";
import { searchFacetFragment } from "./fragments/SearchFacet";

export const FACETED_SEARCH_QUERY = gql`
  query FacetedSearchQuery(
    $siteId: String!
    $query: String!
    $offset: Int
    $limit: Int
    $facetLimit: Int
    $facetFilters: [FacetFilter!]
    $sortFields: [SortFieldWithOrder!]
    $customFilterQueries: [FilterQueryArg]
  ) {
    content {
      facetedSearch(
        siteId: $siteId
        facetFilters: $facetFilters
        facetLimit: $facetLimit
        query: $query
        offset: $offset
        limit: $limit
        sortFields: $sortFields
        customFilterQueries: $customFilterQueries
      ) {
        numFound
        result {
          ...Teasable
        }
        facets {
          ...SearchFacet
        }
      }
    }
  }
  ${teasableFragment}
  ${searchFacetFragment}
`;
