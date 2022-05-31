import { gql } from "@apollo/client";

export const SUGGEST_QUERY = gql`
  query SuggestQuery($siteId: String, $query: String!, $customFilterQueries: [FilterQueryArg], $docTypes: [String!]) {
    content {
      suggest(siteId: $siteId, query: $query, customFilterQueries: $customFilterQueries, docTypes: $docTypes) {
        value
        count
      }
    }
  }
`;
