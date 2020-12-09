import { gql, useQuery, QueryResult } from "@apollo/client";
import { teasableFragment } from "./fragments/TeasableFragment";
import { TeasableQuery, TeasableQueryVariables } from "./__generated__/TeasableQuery";
import { pictureFragment } from "./fragments/PictureFragment";
import { imageMapFragment } from "./fragments/ImageMapFragment";
import { videoFragment } from "./fragments/VideoFragment";
import { productTeaserFragment } from "./fragments/ProductTeaserFragment";

const TEASABLE_QUERY = gql`
  query TeasableQuery($id: String!) {
    content {
      content(id: $id) {
        ...Teasable
        ...Picture
        ...ProductTeaser
        ...ImageMap
        ...Video
      }
    }
  }
  ${teasableFragment}
  ${pictureFragment}
  ${productTeaserFragment}
  ${imageMapFragment}
  ${videoFragment}
`;

export default (id: string): QueryResult<TeasableQuery> => {
  return useQuery<TeasableQuery, TeasableQueryVariables>(TEASABLE_QUERY, {
    variables: { id },
  });
};
