import { gql } from "@apollo/client";
import { pictureFragment } from "./PictureFragment";
import { cropFragment } from "./CropFragment";

export const previewPictureFragment = gql`
  fragment PreviewPicture on CMPicture {
    crops {
      ...Crop
    }
    ...Picture
  }
  ${pictureFragment}
  ${cropFragment}
`;
