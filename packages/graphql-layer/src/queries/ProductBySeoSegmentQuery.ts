import { gql, useQuery, QueryResult } from "@apollo/client";
import {
  ProductBySeoSegmentQueryVariables,
  ProductBySeoSegmentQuery as Query,
} from "./__generated__/ProductBySeoSegmentQuery";
import { detailProductFragment } from "./fragments/DetailProductFragment";
import { pageGridFragment } from "./fragments/PageGridFragment";

const PRODUCT_BY_SEO_SEGMENT_QUERY = gql`
  query ProductBySeoSegmentQuery($seoSegment: String!, $siteId: String!) {
    productBySeoSegment(seoSegment: $seoSegment, siteId: $siteId) {
      ...DetailProduct
      augmentation {
        grid {
          ...PageGrid
        }
      }
    }
  }
  ${detailProductFragment}
  ${pageGridFragment}
`;

export const ProductBySeoSegmentQuery = (seoSegment: string, siteId: string): QueryResult<Query> => {
  return useQuery<Query, ProductBySeoSegmentQueryVariables>(PRODUCT_BY_SEO_SEGMENT_QUERY, {
    variables: { seoSegment, siteId },
  });
};
