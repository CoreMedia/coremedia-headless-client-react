import { gql } from "@apollo/client";
import { dimensionFragment } from "./DimensionFragment";

export const cropFragment = gql`
  fragment Crop on Crop {
    aspectRatio {
      ...Dimension
    }
    name
    minWidth
    minHeight
    sizes {
      ...Dimension
    }
  }
  ${dimensionFragment}
`;
