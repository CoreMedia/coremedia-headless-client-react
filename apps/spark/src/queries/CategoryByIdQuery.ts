import { gql, QueryResult, useQuery } from "@apollo/client";
import { detailCategoryFragment } from "./fragments/DetailCategoryFragment";
import { CategoryByIdQuery, CategoryByIdQueryVariables } from "./__generated__/CategoryByIdQuery";

const CATEGORY_BY_ID_QUERY = gql`
  query CategoryByIdQuery($externalId: String!, $siteId: String!) {
    category(categoryId: $externalId, siteId: $siteId) {
      ...DetailCategory
    }
  }
  ${detailCategoryFragment}
`;

export default (externalId: string, siteId: string): QueryResult<CategoryByIdQuery> => {
  return useQuery<CategoryByIdQuery, CategoryByIdQueryVariables>(CATEGORY_BY_ID_QUERY, {
    variables: { externalId: externalId, siteId },
  });
};
