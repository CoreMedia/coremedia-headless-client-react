import { initializePicture, Picture } from "./Picture";
import PreviewMetadataProps, { getPropertyName } from "../../utils/Preview/MetaData";
import { Author, initializeAuthor } from "./Author";
import { Target } from "./Target";
import { Teasable } from "../../queries/fragments/__generated__/Teasable";
import { Person } from "../../queries/fragments/__generated__/Person";
import { createHref } from "../../utils/Link/LinkUtils";
import { Linkable } from "../../queries/fragments/__generated__/Linkable";
import { addProperty, mapProperties } from "../../utils/ViewDispatcher/ModelHelper";

/**
 * @category ViewModels
 */
export interface OverlayConfiguration {
  style: any | null;
  enabled: boolean | null;
  positionX: number | null;
  positionY: number | null;
  width: number | null;
}

/**
 * @category ViewModels
 */
export interface Banner extends PreviewMetadataProps {
  picture?: Picture;
  title: string | null;
  plaintext: string | null;
  linkTarget?: string;
  displayDate?: string;
  authors?: Array<Author | null>;
  targets?: Array<Target>;
  overlayRequired: boolean;
  overlayConfiguration?: OverlayConfiguration;
  text?: string;
}

/**
 * Returns a [[Banner]] object based on the GraphQL [[Teasable]]
 * @param self
 * @param rootSegment
 */
export const initializeBanner = (self: Teasable, rootSegment: string): Banner => {
  const banner: Banner = {
    displayDate: self.extDisplayedDate || self.modificationDate,
    ...mapProperties(self, { text: "teaserText", title: "teaserTitle", plaintext: "plainTeaserText" }),
    overlayRequired: !!(self.teaserOverlaySettings && self.teaserOverlaySettings.enabled),
  };
  if (banner.overlayRequired) {
    banner.overlayConfiguration = self.teaserOverlaySettings as OverlayConfiguration;
  }
  self.picture && addProperty(banner, "picture", initializePicture(self.picture), getPropertyName(self, "picture"));
  self.authors &&
    addProperty(
      banner,
      "authors",
      self.authors.map((author) => {
        return initializeAuthor(author as Person, rootSegment);
      }),
      getPropertyName(self, "authors")
    );

  if (self.teaserTargets) {
    const targets = self.teaserTargets
      .map((teaserTarget) => {
        return (
          teaserTarget && {
            target: createHref(teaserTarget.target as Linkable, rootSegment) || "",
            callToActionEnabled: teaserTarget.callToActionEnabled && true ? teaserTarget.callToActionEnabled : false,
            callToActionText: teaserTarget.callToActionText || undefined,
          }
        );
      })
      .filter((item) => {
        return item !== undefined && item !== null;
      }) as Array<Target>;
    addProperty(banner, "targets", targets, getPropertyName(self, "teaserTargets"));
  }

  const linkTarget = createHref(self, rootSegment);
  linkTarget && (banner.linkTarget = linkTarget);
  return banner;
};
