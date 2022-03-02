import { gql, useQuery, QueryResult } from "@apollo/client";
import { teasableFragment } from "./fragments/TeasableFragment";
import { pageGridFragment } from "./fragments/PageGridFragment";
import { PageByPathQuery as Query, PageByPathQueryVariables } from "./__generated__/PageByPathQuery";

const PAGE_BY_PATH_QUERY = gql`
  query PageByPathQuery($path: String!) {
    content {
      pageByPath(path: $path) {
        grid {
          ...PageGrid
        }
        id
        title
      }
    }
  }
  ${teasableFragment}
  ${pageGridFragment}
`;

export const PageByPathQuery = (path: string): QueryResult<Query> => {
  return useQuery<Query, PageByPathQueryVariables>(PAGE_BY_PATH_QUERY, {
    variables: { path },
  });
};
