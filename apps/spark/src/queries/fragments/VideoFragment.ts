import { gql } from "@apollo/client";
import { linkableFragment } from "./LinkableFragment";
import { mediaFragment } from "./MediaFragment";
import { teasableFragment } from "./TeasableFragment";
import { timeLineFragment } from "./TimeLineFragment";

export const videoFragment = gql`
  fragment Video on CMVideo {
    ...Media
    teaserTitle
    teaserText
    title
    dataUrl
    ...Linkable
    ...Teasable
    settings(paths: "playerSettings")
    timeLine {
      ...TimeLine
    }
    viewtype
  }

  ${linkableFragment}
  ${teasableFragment}
  ${mediaFragment}
  ${timeLineFragment}
`;
