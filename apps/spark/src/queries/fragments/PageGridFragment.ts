import { gql } from "@apollo/client";
import { pageGridRowFragment } from "./PageGridRowFragment";

export const pageGridFragment = gql`
  fragment PageGrid on PageGrid {
    id
    rows {
      ...PageGridRow
    }
  }
  ${pageGridRowFragment}
`;
