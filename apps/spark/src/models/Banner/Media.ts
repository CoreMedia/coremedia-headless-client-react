import { Video as GraphQLVideo } from "@coremedia-labs/graphql-layer";
import { PreviewMetadata } from "../../utils/Preview/MetaData";
import { mapProperties } from "../../utils/ViewDispatcher/ModelHelper";
import { initializePicture, Picture } from "./Picture";
import { addVideo, SupportsVideo } from "./VideoBanner";

/**
 * @category ViewModels
 */
export interface Video extends SupportsVideo, PreviewMetadata {
  title: string | null;
  alt: string | null;
}

export const initializeVideo = (video: GraphQLVideo): Video => {
  const result: Video = {
    ...mapProperties(video, {
      title: "title",
      alt: "alt",
    }),
  };
  addVideo(video, result);
  return result;
};

export const initializeMedia = (media: any): Video | Picture | null => {
  if ("__typename" in media) {
    const typename = media.__typename;
    if (typename) {
      if (typename.indexOf("CMPicture") >= 0) {
        return initializePicture(media);
      } else if (typename.indexOf("CMVideo") >= 0) {
        return initializeVideo(media);
      }
    }
  }
  return null;
};
