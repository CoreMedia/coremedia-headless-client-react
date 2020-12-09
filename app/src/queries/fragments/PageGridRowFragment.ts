import { gql } from "@apollo/client";
import { pageGridPlacementFragment } from "./PageGridPlacementFragment";

export const pageGridRowFragment = gql`
  fragment PageGridRow on PageGridRow {
    id
    rowId
    placements {
      ...PageGridPlacement
    }
  }
  ${pageGridPlacementFragment}
`;
