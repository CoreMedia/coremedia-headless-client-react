import { Teasable, Linkable, ProductRef } from "@coremedia-labs/graphql-layer";
import { LinkAttributes } from "../../components/Link/Link";
import { getLink } from "../../utils/Link/LinkUtils";
import { PreviewMetadata, getPropertyName } from "../../utils/Preview/MetaData";
import { Dispatchable } from "../../utils/ViewDispatcher/Dispatchable";
import { addProperty, mapProperties } from "../../utils/ViewDispatcher/ModelHelper";
import { addCMProductOverrides } from "../Navigation/Navigation";
import { addAuthors, SupportsAuthors } from "./Author";
import { addStaticCode, SupportsStaticCode } from "./Code";
import { addExternalLinkOverrides } from "./ExternalLink";
import { addImagemap, SupportsImagemap } from "./ImagemapBanner";
import { addPicture, SupportsPicture } from "./Picture";
import {
  addPricing,
  addProductOverrides,
  addShopNow,
  initializeProductBannerFromProduct,
  SupportsPricing,
  SupportsShopNow,
} from "./ProductBanner";
import { Target } from "./Target";
import { addTimeline, addVideo, SupportsTimeline, SupportsVideo } from "./VideoBanner";

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
export interface Banner
  extends PreviewMetadata,
    SupportsAuthors,
    SupportsShopNow,
    SupportsPricing,
    SupportsVideo,
    SupportsPicture,
    SupportsTimeline,
    SupportsTitle,
    SupportsImagemap,
    SupportsStaticCode,
    SupportsViewtype,
    LinkAttributes {
  plaintext: string | null;
  displayDate?: string;
  targets?: Array<Target>;
  overlayRequired: boolean;
  overlayConfiguration?: OverlayConfiguration;
  text?: string;
}

export interface SupportsTitle extends PreviewMetadata {
  title: string | null;
}

export interface SupportsViewtype extends PreviewMetadata {
  viewtype: string | null;
}

const addViewtype = (self: any, result: SupportsViewtype) => {
  if ("viewtype" in self) {
    result.viewtype = self.viewtype;
  }
};

/**
 * Returns a [[Banner]] object based on the GraphQL [[Teasable]]
 */
export const initializeBanner = (self: Teasable, rootSegment: string): Banner => {
  const banner: Banner = {
    displayDate: self.extDisplayedDate || self.modificationDate,
    ...mapProperties(self, { title: "teaserTitle" }),
    overlayRequired: !!(self.teaserOverlaySettings && self.teaserOverlaySettings.enabled),
    ...getLink(self, rootSegment),
  };
  (self.teaserText?.text ?? self.teaserText?.text !== undefined) &&
    addProperty(banner, "text", self.teaserText?.text, getPropertyName(self, "teaserText"));
  (self.teaserText?.plaintext ?? self.teaserText?.plaintext !== undefined) &&
    addProperty(banner, "plaintext", self.teaserText?.plaintext, getPropertyName(self, "teaserText"));
  if (banner.overlayRequired) {
    banner.overlayConfiguration = self.teaserOverlaySettings as OverlayConfiguration;
  }
  addViewtype(self, banner);
  addPicture(self, banner);
  addAuthors(self, banner, rootSegment);
  addShopNow(self, banner);
  addPricing(self, banner);
  addVideo(self, banner);
  addProductOverrides(self, banner);
  addCMProductOverrides(self, banner);
  addImagemap(self, banner, rootSegment);
  addTimeline(self, banner, rootSegment);

  if (self.teaserTargets) {
    const targets = self.teaserTargets
      .map((teaserTarget) => {
        return (
          teaserTarget && {
            ...getLink(teaserTarget.target as Linkable, rootSegment),
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
  addStaticCode(self, banner);
  addExternalLinkOverrides(self, banner);
  return banner;
};

export const initializeBannerFor = (self: Dispatchable, rootSegment: string): Banner | null => {
  if (self.__typename.indexOf("CM") >= 0) {
    return initializeBanner(self as Teasable, rootSegment);
  } else if (self.__typename.indexOf("ProductRef") >= 0) {
    const productRef: ProductRef = self as ProductRef;
    return productRef && productRef.product && initializeProductBannerFromProduct(productRef.product, rootSegment);
  }
  return null;
};
