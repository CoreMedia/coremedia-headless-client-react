import { gql } from "@apollo/client";

export const teasableOverlayFragment = gql`
  fragment TeasableOverlaySettings on TeaserOverlaySettings {
    style
    enabled
    positionX
    positionY
    width
  }
`;
