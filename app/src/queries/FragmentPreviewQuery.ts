import { gql, useQuery, QueryResult } from "@apollo/client";
import { teasableFragment } from "./fragments/TeasableFragment";
import { detailTeasableFragment } from "./fragments/DetailTeasableFragment";
import { videoFragment } from "./fragments/VideoFragment";
import { externalChannelFragment } from "./fragments/ExternalChannelFragment";
import { collectionFragment } from "./fragments/CollectionFragment";
import { imageMapFragment } from "./fragments/ImageMapFragment";
import { previewPictureFragment } from "./fragments/PreviewPictureFragment";
import { FragmentPreviewQuery, FragmentPreviewQueryVariables } from "./__generated__/FragmentPreviewQuery";
import { detailPersonFragment } from "./fragments/DetailPersonFragment";

const FRAGMENT_PREVIEW_QUERY = gql`
  query FragmentPreviewQuery($contentId: String!) {
    content {
      content(id: $contentId) {
        ...DetailTeasable
        ...Teasable
        ...PreviewPicture
        ...Video
        ...ExternalChannel
        ...Collection
        ...ImageMap
        ...DetailPerson
      }
    }
  }
  ${detailTeasableFragment}
  ${teasableFragment}
  ${previewPictureFragment}
  ${videoFragment}
  ${externalChannelFragment}
  ${collectionFragment}
  ${imageMapFragment}
  ${detailPersonFragment}
`;

export default (contentId: string): QueryResult<FragmentPreviewQuery> => {
  return useQuery<FragmentPreviewQuery, FragmentPreviewQueryVariables>(FRAGMENT_PREVIEW_QUERY, {
    variables: { contentId },
  });
};
