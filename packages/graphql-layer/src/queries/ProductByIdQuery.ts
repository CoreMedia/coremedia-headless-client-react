import { gql, useQuery, QueryResult } from "@apollo/client";
import { detailProductFragment } from "./fragments/DetailProductFragment";
import { pageGridFragment } from "./fragments/PageGridFragment";
import { ProductByIdQuery as Query, ProductByIdQueryVariables } from "./__generated__/ProductByIdQuery";

const PRODUCT_BY_ID_QUERY = gql`
  query ProductByIdQuery($externalId: String!, $siteId: String!) {
    product(externalId: $externalId, siteId: $siteId) {
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

export const ProductByIdQuery = (externalId: string, siteId: string): QueryResult<Query> => {
  return useQuery<Query, ProductByIdQueryVariables>(PRODUCT_BY_ID_QUERY, {
    variables: { externalId, siteId },
  });
};
