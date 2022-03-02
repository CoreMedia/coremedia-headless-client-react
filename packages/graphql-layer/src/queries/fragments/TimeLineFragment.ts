import { gql } from "@apollo/client";
import { teasableFragment } from "./TeasableFragment";
import { timeLineEntryFragment } from "./TimeLineEntryFragment";

export const timeLineFragment = gql`
  fragment TimeLine on TimeLine {
    defaultTarget {
      ...Teasable
    }
    sequences {
      ...TimeLineEntry
    }
  }
  ${teasableFragment}
  ${timeLineEntryFragment}
`;
