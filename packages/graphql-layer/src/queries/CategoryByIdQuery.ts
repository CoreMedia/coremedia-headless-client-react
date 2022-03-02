import { gql, QueryResult, useQuery } from "@apollo/client";
import { detailCategoryFragment } from "./fragments/DetailCategoryFragment";
import { CategoryByIdQuery as Query, CategoryByIdQueryVariables } from "./__generated__/CategoryByIdQuery";

const CATEGORY_BY_ID_QUERY = gql`
  query CategoryByIdQuery($externalId: String!, $siteId: String!) {
    category(categoryId: $externalId, siteId: $siteId) {
      ...DetailCategory
    }
  }
  ${detailCategoryFragment}
`;

export const CategoryByIdQuery = (externalId: string, siteId: string): QueryResult<Query> => {
  return useQuery<Query, CategoryByIdQueryVariables>(CATEGORY_BY_ID_QUERY, {
    variables: { externalId: externalId, siteId },
  });
};
