import { gql } from "@apollo/client";
import { linkableFragment } from "./LinkableFragment";
import { pictureFragment } from "./PictureFragment";
import { teasableOverlayFragment } from "./TeasableOverlayFragment";
import { teaserTargetFragment } from "./TeaserTargetFragment";
import { personFragment } from "./PersonFragment";

export const teasableFragment = gql`
  fragment Teasable on CMTeasable {
    id
    picture {
      ...Picture
    }
    teaserText {
      text
      plaintext: text(view: "plainFirstParagraph")
    }
    teaserTitle
    teaserOverlaySettings {
      ...TeasableOverlaySettings
    }
    authors {
      ...Person
    }
    ...Linkable
    extDisplayedDate
    modificationDate
    teaserTargets {
      ...TeaserTarget
    }
  }
  ${linkableFragment}
  ${pictureFragment}
  ${teasableOverlayFragment}
  ${teaserTargetFragment}
  ${personFragment}
`;
