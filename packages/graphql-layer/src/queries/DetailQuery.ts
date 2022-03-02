import { gql, useQuery, QueryResult } from "@apollo/client";
import { detailTeasableFragment } from "./fragments/DetailTeasableFragment";
import { detailPersonFragment } from "./fragments/DetailPersonFragment";
import { detailCMProductFragment } from "./fragments/DetailCMProduct";
import { DetailQuery as Query, DetailQueryVariables } from "./__generated__/DetailQuery";

const DETAIL_QUERY = gql`
  query DetailQuery($id: String!) {
    content {
      content(id: $id) {
        id
        ...DetailTeasable
        ...DetailPerson
        ...DetailCMProduct
      }
    }
  }
  ${detailTeasableFragment}
  ${detailPersonFragment}
  ${detailCMProductFragment}
`;

export const DetailQuery = (id: string): QueryResult<Query> => {
  return useQuery<Query, DetailQueryVariables>(DETAIL_QUERY, {
    variables: { id },
  });
};
