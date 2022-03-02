import { gql } from "@apollo/client";
import { linkableFragment } from "../LinkableFragment";
import { pictureFragment } from "../PictureFragment";

export const teasableForNavigationFragment = gql`
  fragment TeasableForNavigation on CMTeasable {
    teaserTitle
    ...Linkable
    picture {
      ...Picture
    }
  }
  ${pictureFragment}
  ${linkableFragment}
`;
