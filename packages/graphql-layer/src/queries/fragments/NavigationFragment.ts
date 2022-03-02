import { gql } from "@apollo/client";
import { teasableFragment } from "./TeasableFragment";
import { pictureFragment } from "./PictureFragment";
import { linkableFragment } from "./LinkableFragment";

export const navigationFragment = gql`
  fragment Navigation on CMNavigation {
    id
    picture {
      ...Picture
    }
    segment
    ...Teasable
    ...Linkable
  }

  ${teasableFragment}
  ${linkableFragment}
  ${pictureFragment}
`;
