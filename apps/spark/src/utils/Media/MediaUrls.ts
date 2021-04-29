import { Video } from "../../queries/fragments/__generated__/Video";
import { Picture } from "../../models/Banner/Picture";
import { getBackendUri } from "../App/App";

/**
 * Checks if an URL is an absolute URL
 * @param url
 */
export const isUrlAbsolute = (url: string): boolean => url.indexOf("://") > 0 || url.indexOf("//") === 0;

/**
 * Returns an image URL based on the parameters
 * @param imageUriTemplate
 * @param cropName
 * @param width
 */
export const getImageUrl = (imageUriTemplate: string | null, cropName: string, width: number): string => {
  if (imageUriTemplate == null) {
    console.error("Error in getImageUrl. Parameter imageUrl is not set.");
    return "";
  }

  if (!isUrlAbsolute(imageUriTemplate)) {
    imageUriTemplate = getBackendUri() + imageUriTemplate;
  }
  return imageUriTemplate.replace("{cropName}", cropName).replace("{width}", String(width));
};

/**
 * Return the URL of a video
 * @param media
 */
export const getVideoUrl = (media: Video): string | null => {
  let videoLink: string | null = media.dataUrl;
  if (!videoLink && media.data !== undefined) {
    videoLink = getBackendUri() + media.data?.uri;
  }
  return videoLink;
};

/**
 * Return an image URL of a [[Picture]].<br>
 * If no cropName and width are defined, the original image is returned
 * @param self
 * @param cropName
 * @param width
 */
export const getImageUrlByPicture = (
  self: Picture,
  cropName: string | undefined,
  width: number | undefined
): string => {
  let imageUrl = getBackendUri() + self?.data?.uri || "";
  if (self.uriTemplate && cropName !== undefined && width !== undefined) {
    imageUrl = getImageUrl(self.uriTemplate, cropName, width);
  }

  return imageUrl;
};
