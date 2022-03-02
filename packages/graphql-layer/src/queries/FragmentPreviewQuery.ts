import { gql, useQuery, QueryResult } from "@apollo/client";
import { teasableFragment } from "./fragments/TeasableFragment";
import { detailTeasableFragment } from "./fragments/DetailTeasableFragment";
import { videoFragment } from "./fragments/VideoFragment";
import { externalChannelFragment } from "./fragments/ExternalChannelFragment";
import { collectionFragment } from "./fragments/CollectionFragment";
import { imageMapFragment } from "./fragments/ImageMapFragment";
import { previewPictureFragment } from "./fragments/PreviewPictureFragment";
import { FragmentPreviewQuery as Query, FragmentPreviewQueryVariables } from "./__generated__/FragmentPreviewQuery";
import { detailPersonFragment } from "./fragments/DetailPersonFragment";
import { productTeaserFragment } from "./fragments/ProductTeaserFragment";
import { CMProductFragment } from "./fragments/CMProductFragment";
import { externalLinkFragment } from "./fragments/ExternalLinkFragment";
import { externalProductFragment } from "./fragments/ExternalProductFragment";
import { downloadFragment } from "./fragments/DownloadFragment";

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
        ...ProductTeaser
        ...CMProduct
        ...ExternalLink
        ...ExternalProduct
        ...Download
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
  ${productTeaserFragment}
  ${CMProductFragment}
  ${externalLinkFragment}
  ${externalProductFragment}
  ${downloadFragment}
`;

export const FragmentPreviewQuery = (contentId: string): QueryResult<Query> => {
  return useQuery<Query, FragmentPreviewQueryVariables>(FRAGMENT_PREVIEW_QUERY, {
    variables: { contentId },
  });
};
