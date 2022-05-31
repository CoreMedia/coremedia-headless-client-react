import { gql, useQuery, QueryResult } from "@apollo/client";
import { SearchQuery as Query, SearchQueryVariables } from "./__generated__/SearchQuery";
import { teasableFragment } from "./fragments/TeasableFragment";
import { SortFieldWithOrder } from "../__generated__/globalTypes";

export const SEARCH_QUERY = gql`
  query SearchQuery(
    $siteId: String!
    $query: String!
    $offset: Int
    $limit: Int
    $sortFields: [SortFieldWithOrder]
    $customFilterQueries: [FilterQueryArg]
    $docTypes: [String]
  ) {
    content {
      search(
        siteId: $siteId
        query: $query
        offset: $offset
        limit: $limit
        sortFields: $sortFields
        customFilterQueries: $customFilterQueries
        docTypes: $docTypes
      ) {
        numFound
        result {
          ...Teasable
        }
      }
    }
  }
  ${teasableFragment}
`;

export const SearchQuery = (
  siteId: string,
  query: string,
  offset?: number | null,
  limit?: number | null,
  sortFields?: (SortFieldWithOrder | null)[] | null,
  customFilterQueries?: (unknown | null)[] | null,
  docTypes?: (string | null)[] | null
): QueryResult<Query> => {
  return useQuery<Query, SearchQueryVariables>(SEARCH_QUERY, {
    variables: { siteId, query, offset, limit, sortFields, customFilterQueries, docTypes },
    notifyOnNetworkStatusChange: true,
  });
};
