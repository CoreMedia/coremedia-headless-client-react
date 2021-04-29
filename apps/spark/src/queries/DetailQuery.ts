import { gql, useQuery, QueryResult } from "@apollo/client";
import { detailTeasableFragment } from "./fragments/DetailTeasableFragment";
import { detailPersonFragment } from "./fragments/DetailPersonFragment";
import { detailCMProductFragment } from "./fragments/DetailCMProduct";
import { DetailQuery, DetailQueryVariables } from "./__generated__/DetailQuery";

const DETAIL_QUERY = gql`
  query DetailQuery($id: String!) {
    content {
      content(id: $id) {
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

export default (id: string): QueryResult<DetailQuery> => {
  return useQuery<DetailQuery, DetailQueryVariables>(DETAIL_QUERY, {
    variables: { id },
  });
};
