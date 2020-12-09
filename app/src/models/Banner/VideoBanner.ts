import { Banner, initializeBanner } from "./Banner";
import { Video } from "../../queries/fragments/__generated__/Video";
import { getVideoUrl } from "../../utils/Media/MediaUrls";

/**
 * @category ViewModels
 */
export interface PlayerSettings {
  autoplay: boolean;
  hideControls: boolean;
  loop: boolean;
  muted: boolean;
}

/**
 * @category ViewModels
 */
export interface VideoBanner extends Banner {
  playerSettings?: PlayerSettings;
  videoUrl?: string;
}

/**
 * Returns a [[VideoBanner]] object based on the GraphQL [[Video]]
 * @param video
 * @param rootSegment Needed for link building
 */
export const initializeVideoBanner = (video: Video, rootSegment: string): VideoBanner => {
  const banner: VideoBanner = initializeBanner(video, rootSegment);
  video.settings && (banner.playerSettings = video.settings.playerSettings);
  const videoUrl = getVideoUrl(video);
  videoUrl && (banner.videoUrl = videoUrl);
  return banner;
};
