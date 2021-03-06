import { gql } from "@apollo/client";
import { pictureFragment } from "./PictureFragment";
import { linkableFragment } from "./LinkableFragment";

export const personFragment = gql`
  fragment Person on CMPerson {
    ...Linkable
    displayName
    teaserText
    firstName
    lastName
    picture {
      ...Picture
    }
  }
  ${pictureFragment}
  ${linkableFragment}
`;
