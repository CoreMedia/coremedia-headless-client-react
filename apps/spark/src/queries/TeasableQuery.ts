import { gql, useQuery, QueryResult } from "@apollo/client";
import { teasableFragment } from "./fragments/TeasableFragment";
import { TeasableQuery, TeasableQueryVariables } from "./__generated__/TeasableQuery";
import { pictureFragment } from "./fragments/PictureFragment";
import { imageMapFragment } from "./fragments/ImageMapFragment";
import { videoFragment } from "./fragments/VideoFragment";
import { productTeaserFragment } from "./fragments/ProductTeaserFragment";
import { CMProductFragment } from "./fragments/CMProductFragment";
import { externalLinkFragment } from "./fragments/ExternalLinkFragment";
import { collectionFragment } from "./fragments/CollectionFragment";

const TEASABLE_QUERY = gql`
  query TeasableQuery($id: String!) {
    content {
      content(id: $id) {
        ...Teasable
        ...Picture
        ...ProductTeaser
        ...ImageMap
        ...Video
        ...CMProduct
        ...ExternalLink
        ...Collection
      }
    }
  }
  ${teasableFragment}
  ${pictureFragment}
  ${productTeaserFragment}
  ${imageMapFragment}
  ${videoFragment}
  ${CMProductFragment}
  ${externalLinkFragment}
  ${collectionFragment}
`;

export default (id: string): QueryResult<TeasableQuery> => {
  return useQuery<TeasableQuery, TeasableQueryVariables>(TEASABLE_QUERY, {
    variables: { id },
  });
};
