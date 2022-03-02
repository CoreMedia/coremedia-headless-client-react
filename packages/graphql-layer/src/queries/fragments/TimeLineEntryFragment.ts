import { gql } from "@apollo/client";
import { teasableFragment } from "./TeasableFragment";
import { productTeaserFragment } from "./ProductTeaserFragment";

export const timeLineEntryFragment = gql`
  fragment TimeLineEntry on TimeLineEntry {
    startTimeMillis
    link {
      ...Teasable
      ...ProductTeaser
    }
  }
  ${teasableFragment}
  ${productTeaserFragment}
`;
