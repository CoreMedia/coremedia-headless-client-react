import { gql } from "@apollo/client";
import { teasableFragment } from "./TeasableFragment";

export const downloadFragment = gql`
  fragment Download on CMDownload {
    ...Teasable
    data {
      uri
    }
  }
  ${teasableFragment}
`;
