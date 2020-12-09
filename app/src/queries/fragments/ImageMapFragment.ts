import { gql } from "@apollo/client";
import { teasableFragment } from "./TeasableFragment";
import { productTeaserFragment } from "./ProductTeaserFragment";

export const imageMapFragment = gql`
  fragment ImageMap on CMImageMap {
    ...Teasable
    overlayConfiguration: settings(paths: ["overlay"])
    transformedHotZones {
      crops {
        name
        coords {
          x
          y
        }
      }
      points {
        x
        y
      }
      alt
      shape
      target
      displayAsInlineOverlay
      inlineOverlayTheme
      linkedContent {
        ...Teasable
        ...ProductTeaser
      }
    }
  }
  ${teasableFragment}
  ${productTeaserFragment}
`;
