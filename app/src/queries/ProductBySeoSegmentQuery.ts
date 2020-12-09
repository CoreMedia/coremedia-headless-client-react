import { gql, useQuery, QueryResult } from "@apollo/client";
import { ProductBySeoSegmentQueryVariables, ProductBySeoSegmentQuery } from "./__generated__/ProductBySeoSegmentQuery";
import { detailProductFragment } from "./fragments/DetailProductFragment";
import { pageGridFragment } from "./fragments/PageGridFragment";

const PRODUCT_BY_SEO_SEGMENT_QUERY = gql`
  query ProductBySeoSegmentQuery($seoSegment: String!) {
    commerce {
      productBySeoSegment(seoSegment: $seoSegment) {
        ...DetailProduct
        grid {
          ...PageGrid
        }
      }
      product(externalId: $seoSegment) {
        ...DetailProduct
        grid {
          ...PageGrid
        }
      }
    }
  }
  ${detailProductFragment}
  ${pageGridFragment}
`;

export default (seoSegment: string): QueryResult<ProductBySeoSegmentQuery> => {
  return useQuery<ProductBySeoSegmentQuery, ProductBySeoSegmentQueryVariables>(PRODUCT_BY_SEO_SEGMENT_QUERY, {
    variables: { seoSegment },
  });
};
