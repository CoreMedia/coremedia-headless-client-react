import { gql, useQuery, QueryResult } from "@apollo/client";
import { ProductBySeoSegmentQueryVariables, ProductBySeoSegmentQuery } from "./__generated__/ProductBySeoSegmentQuery";
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

export default (seoSegment: string, siteId: string): QueryResult<ProductBySeoSegmentQuery> => {
  return useQuery<ProductBySeoSegmentQuery, ProductBySeoSegmentQueryVariables>(PRODUCT_BY_SEO_SEGMENT_QUERY, {
    variables: { seoSegment, siteId },
  });
};
