import { CmTeasableFragment, TimeLine } from "@coremedia-labs/graphql-layer";
import { getVideoUrl } from "../../utils/Media/MediaUrls";
import { PreviewMetadata } from "../../utils/Preview/MetaData";
import { Dispatchable } from "../../utils/ViewDispatcher/Dispatchable";
import { addProperty } from "../../utils/ViewDispatcher/ModelHelper";
import { Banner, initializeBanner } from "./Banner";
import { initializeVideo } from "./Media";

/**
 * @category ViewModels
 */
export interface Video {
  playerSettings?: PlayerSettings;
  videoUrl?: string;
}

export interface PlayerSettings {
  autoplay: boolean;
  hideControls: boolean;
  loop: boolean;
  muted: boolean;
}

export interface SupportsVideo extends PreviewMetadata {
  video?: Video;
}

export interface SupportsTimeline extends PreviewMetadata {
  timeline?: Array<TimelineEntry>;
}

export interface TimelineEntry {
  startTime: number;
  endTime: number | undefined;
  entry: Banner;
  activeIdForBlock: number;
}

export const getSortedTimeLineSequences = (timeLine: TimeLine, rootSegment: string): Array<TimelineEntry> => {
  const sequenceEntries: {
    [key: number]: Array<Dispatchable>;
  } = {};

  const defaultTarget = timeLine && timeLine.defaultTarget;
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
        entry: initializeBanner(item as CmTeasableFragment, rootSegment),
        activeIdForBlock: elementToActivate,
      });
      return true;
    });
    elementToActivate = elementToActivate += value.length;
    return true;
  });
  return timeLineEntries;
};

export const supportsVideo = (object: any): object is SupportsVideo => {
  return "video" in object;
};

export const addVideo = (self: any, result: SupportsVideo): void => {
  const videoUrl = getVideoUrl(self);

  //in case self is directly a video
  if (videoUrl) {
    const video: Video = { videoUrl: videoUrl };

    if (self.settings?.playerSettings) {
      video.playerSettings = self.settings.playerSettings;
    }
    result.video = video;
  } else if (self.media) {
    const video =
      self.media && self.media[0] && self.media[0].__typename === "CMVideoImpl" && initializeVideo(self.media[0]);
    if (video) {
      result.video = video.video;
    }
  }
};

export const addTimeline = (self: any, result: SupportsTimeline, rootSegment: string): void => {
  if (self.timeLine) {
    addProperty(result, "timeline", getSortedTimeLineSequences(self.timeLine, rootSegment));
  }
};

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
