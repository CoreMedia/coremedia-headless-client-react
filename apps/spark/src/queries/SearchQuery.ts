import { gql, useQuery, QueryResult } from "@apollo/client";
import { SearchQuery, SearchQueryVariables } from "./__generated__/SearchQuery";
import { teasableFragment } from "./fragments/TeasableFragment";
import { SortFieldWithOrder } from "../__generated__/globalTypes";

const SEARCH_QUERY = gql`
  query SearchQuery(
    $siteId: String!
    $query: String!
    $offset: Int
    $limit: Int
    $sortFields: [SortFieldWithOrder]
    $docTypes: [String]
  ) {
    content {
      search(
        siteId: $siteId
        query: $query
        offset: $offset
        limit: $limit
        sortFields: $sortFields
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

export default (
  siteId: string,
  query: string,
  offset?: number | null,
  limit?: number | null,
  sortFields?: (SortFieldWithOrder | null)[] | null,
  docTypes?: (string | null)[] | null
): QueryResult<SearchQuery> => {
  return useQuery<SearchQuery, SearchQueryVariables>(SEARCH_QUERY, {
    variables: { siteId, query, offset, limit, sortFields, docTypes },
  });
};
