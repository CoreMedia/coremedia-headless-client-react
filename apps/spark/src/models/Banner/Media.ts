import { CmVideo } from "@coremedia-labs/graphql-layer";
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

export const initializeVideo = (video: CmVideo): Video => {
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
  if (media.__typename) {
    if (media.__typename.startsWith("CMPicture")) {
      return initializePicture(media);
    } else if (media.__typename.startsWith("CMVideo")) {
      return initializeVideo(media);
    }
  }
  return null;
};
