import { gql } from "@apollo/client";
import { pictureFragment } from "./PictureFragment";
import { linkableFragment } from "./LinkableFragment";
import { teasableFragment } from "./TeasableFragment";
import { videoFragment } from "./VideoFragment";
import { personFragment } from "./PersonFragment";
import { collectionFragment } from "./CollectionFragment";

export const detailTeasableFragment = gql`
  fragment DetailTeasable on CMTeasable {
    id
    detailText
    detailTextAsTree
    pictures {
      ...Picture
    }
    media {
      ...Picture
      ...Video
    }
    title
    extDisplayedDate
    modificationDate
    subjectTaxonomy {
      ... on CMTaxonomy {
        value
      }
      ...Linkable
    }
    authors {
      ...Person
    }
    related {
      ...Picture
      ...Teasable
      ...Collection
    }
  }

  ${pictureFragment}
  ${teasableFragment}
  ${linkableFragment}
  ${videoFragment}
  ${personFragment}
  ${collectionFragment}
`;
