import { gql, QueryResult, useQuery } from "@apollo/client";
import {
  CategoryBySeoSegmentQuery as Query,
  CategoryBySeoSegmentQueryVariables,
} from "./__generated__/CategoryBySeoSegmentQuery";
import { detailCategoryFragment } from "./fragments/DetailCategoryFragment";

const CATEGORY_BY_SEO_SEGMENT_QUERY = gql`
  query CategoryBySeoSegmentQuery($seoSegment: String!, $siteId: String!) {
    categoryBySeoSegment(seoSegment: $seoSegment, siteId: $siteId) {
      ...DetailCategory
    }
  }
  ${detailCategoryFragment}
`;

export const CategoryBySeoSegmentQuery = (seoSegment: string, siteId: string): QueryResult<Query> => {
  return useQuery<Query, CategoryBySeoSegmentQueryVariables>(CATEGORY_BY_SEO_SEGMENT_QUERY, {
    variables: { seoSegment, siteId },
  });
};
