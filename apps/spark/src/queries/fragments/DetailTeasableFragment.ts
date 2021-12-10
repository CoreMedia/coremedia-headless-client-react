import { gql } from "@apollo/client";
import { pictureFragment } from "./PictureFragment";
import { linkableFragment } from "./LinkableFragment";
import { teasableFragment } from "./TeasableFragment";
import { videoFragment } from "./VideoFragment";
import { personFragment } from "./PersonFragment";
import { collectionFragment } from "./CollectionFragment";
import { productTeaserFragment } from "./ProductTeaserFragment";
import { tagFragment } from "./TagFragment";

export const detailTeasableFragment = gql`
  fragment DetailTeasable on CMTeasable {
    id
    detailText {
      text
      textAsTree
      textReferencedContent {
        ...Picture
        ...Teasable
        ...ProductTeaser
      }
    }
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
      ...Tag
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
  ${productTeaserFragment}
  ${tagFragment}
`;
