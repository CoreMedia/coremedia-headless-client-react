import { Banner, initializeBanner } from "./Banner";
import { Video } from "../../queries/fragments/__generated__/Video";
import { getVideoUrl } from "../../utils/Media/MediaUrls";
import { addProperty } from "../../utils/ViewDispatcher/ModelHelper";
import { Dispatchable } from "../../utils/ViewDispatcher/Dispatchable";
import { TimeLine } from "../../queries/fragments/__generated__/TimeLine";
import { initializeProductBannerFromProductTeaser, ProductBanner } from "./ProductBanner";
import { ProductTeaser } from "../../queries/fragments/__generated__/ProductTeaser";

export interface TimelineEntry {
  startTime: number;
  endTime: number | undefined;
  entry: ProductBanner;
  activeIdForBlock: number;
}

const addOrUpdate = (
  sequenceEntries: { [key: number]: Array<Dispatchable> },
  key: number,
  value: Dispatchable
): void => {
  if (sequenceEntries[key]) {
    const existingEntries = sequenceEntries[key];
    if (existingEntries) {
      sequenceEntries[key] = existingEntries.concat([value]);
    }
  } else {
    sequenceEntries[key] = [value];
  }
};

export const getSortedTimeLineSequences = (timeLine: TimeLine): Array<TimelineEntry> => {
  const sequenceEntries: {
    [key: number]: Array<Dispatchable>;
  } = {};

  const defaultTarget = timeLine.defaultTarget;
  if (defaultTarget) {
    addOrUpdate(sequenceEntries, 0, defaultTarget);
  }
  if (timeLine && timeLine.sequences) {
    timeLine.sequences.map((sequence) => {
      if (sequence?.startTimeMillis && sequence?.link) {
        addOrUpdate(sequenceEntries, sequence.startTimeMillis, sequence.link);
      }
      return true;
    });
  }
  const timeLineEntries: Array<TimelineEntry> = [];
  let elementToActivate = 0;
  Object.entries(sequenceEntries).map(([key, value], outerindex, array) => {
    let endTime: number | undefined = undefined;
    if (outerindex + 1 < array.length) {
      const nextElement: [string, Array<Dispatchable>] = array[outerindex + 1];
      endTime = Number(nextElement[0]) / 1000;
    }
    value.map((item) => {
      timeLineEntries.push({
        startTime: Number(key) / 1000,
        endTime: endTime,
        entry: initializeProductBannerFromProductTeaser(item as ProductTeaser),
        activeIdForBlock: elementToActivate,
      });
      return true;
    });
    elementToActivate = elementToActivate += value.length;
    return true;
  });
  return timeLineEntries;
};

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

export interface ShoppableVideoBanner extends VideoBanner {
  timeline?: Array<TimelineEntry>;
}

/**
 * Returns a [[VideoBanner]] object based on the GraphQL [[Video]]
 * @param video
 */
export const initializeVideoBanner = (video: Video): VideoBanner => {
  const banner: VideoBanner = initializeBanner(video);
  video.settings && (banner.playerSettings = video.settings.playerSettings);
  const videoUrl = getVideoUrl(video);
  videoUrl && (banner.videoUrl = videoUrl);
  return banner;
};

export const initializeShoppableVideoBanner = (video: Video): ShoppableVideoBanner => {
  const banner: ShoppableVideoBanner = initializeVideoBanner(video);
  video.timeLine && addProperty(banner, "timeline", getSortedTimeLineSequences(video.timeLine));
  return banner;
};
