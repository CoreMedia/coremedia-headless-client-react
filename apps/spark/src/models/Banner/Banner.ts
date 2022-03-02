import { initializePicture, Picture } from "./Picture";
import PreviewMetadata, { getPropertyName } from "../../utils/Preview/MetaData";
import { Author, initializeAuthor } from "./Author";
import { Target } from "./Target";
import { Teasable } from "@coremedia-labs/graphql-layer";
import { Person } from "@coremedia-labs/graphql-layer";
import { getLink } from "../../utils/Link/LinkUtils";
import { Linkable } from "@coremedia-labs/graphql-layer";
import { addProperty, mapProperties } from "../../utils/ViewDispatcher/ModelHelper";
import { LinkAttributes } from "../../components/Link/Link";

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
export interface Banner extends PreviewMetadata, LinkAttributes {
  picture?: Picture;
  title: string | null;
  plaintext: string | null;
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
 */
export const initializeBanner = (self: Teasable): Banner => {
  const banner: Banner = {
    displayDate: self.extDisplayedDate || self.modificationDate,
    ...mapProperties(self, { title: "teaserTitle" }),
    overlayRequired: !!(self.teaserOverlaySettings && self.teaserOverlaySettings.enabled),
    ...getLink(self),
  };
  (self.teaserText?.text ?? self.teaserText?.text !== undefined) &&
    addProperty(banner, "text", self.teaserText?.text, getPropertyName(self, "teaserText"));
  (self.teaserText?.plaintext ?? self.teaserText?.plaintext !== undefined) &&
    addProperty(banner, "plaintext", self.teaserText?.plaintext, getPropertyName(self, "teaserText"));
  if (banner.overlayRequired) {
    banner.overlayConfiguration = self.teaserOverlaySettings as OverlayConfiguration;
  }
  self.picture && addProperty(banner, "picture", initializePicture(self.picture), getPropertyName(self, "picture"));
  self.authors &&
    addProperty(
      banner,
      "authors",
      self.authors.map((author) => {
        return initializeAuthor(author as Person);
      }),
      getPropertyName(self, "authors")
    );

  if (self.teaserTargets) {
    const targets = self.teaserTargets
      .map((teaserTarget) => {
        return (
          teaserTarget && {
            ...getLink(teaserTarget.target as Linkable),
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
  // optional props = false
  banner.openInNewTab = false;
  banner.externalLink = false;

  return banner;
};
