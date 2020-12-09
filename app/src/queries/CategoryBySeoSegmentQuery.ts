import { gql, QueryResult, useQuery } from "@apollo/client";
import {
  CategoryBySeoSegmentQuery,
  CategoryBySeoSegmentQueryVariables,
} from "./__generated__/CategoryBySeoSegmentQuery";
import { detailCategoryFragment } from "./fragments/DetailCategoryFragment";

const CATEGORY_BY_SEO_SEGMENT_QUERY = gql`
  query CategoryBySeoSegmentQuery($seoSegment: String!) {
    commerce {
      categoryBySeoSegment(seoSegment: $seoSegment) {
        ...DetailCategory
      }
      category(categoryId: $seoSegment) {
        ...DetailCategory
      }
    }
  }
  ${detailCategoryFragment}
`;

export default (seoSegment: string): QueryResult<CategoryBySeoSegmentQuery> => {
  return useQuery<CategoryBySeoSegmentQuery, CategoryBySeoSegmentQueryVariables>(CATEGORY_BY_SEO_SEGMENT_QUERY, {
    variables: { seoSegment },
  });
};
