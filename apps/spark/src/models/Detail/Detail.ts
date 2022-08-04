import { CmTeasableDetailFragment, CmTeasableFragment } from "@coremedia-labs/graphql-layer";
import { PreviewMetadata, getPropertyName } from "../../utils/Preview/MetaData";
import { addProperty, mapProperties } from "../../utils/ViewDispatcher/ModelHelper";
import { addAuthors, SupportsAuthors } from "../Banner/Author";
import { Banner, initializeBanner, initializeBannerFor, SupportsTitle } from "../Banner/Banner";
import { initializeMedia, Video } from "../Banner/Media";
import { Picture } from "../Banner/Picture";
import { addTags, SupportsTags } from "../Banner/Tag";
import { addCMProductOverrides } from "../Navigation/Navigation";
import { flattenItems, notEmpty } from "../../utils/Helpers";
import { readTimeInMinutes } from "../../utils/Richtext/ReadTime";
import { DetailAuthor, initializeDetailAuthor } from "./DetailAuthor";

export interface SupportsRelated extends PreviewMetadata {
  related?: Array<Banner>;
}

/**
 * @category ViewModels
 */
export interface Detail extends PreviewMetadata, SupportsAuthors, SupportsTags, SupportsTitle, SupportsRelated {
  readTime: number | null;
  structuredText: any | null;
  structuredTextLinks: Array<Banner>;
  displayDate?: string;
  media: Array<Video | Picture | null> | null;
}

/**
 * Returns a [[Detail]] object based on the GraphQL [[DetailTeasable]]
 */
export const initializeDetail = (self: CmTeasableDetailFragment, rootSegment: string): Detail => {
  const detail: Detail = {
    ...mapProperties(self, { title: "title", media: "media" }),
    displayDate: self.extDisplayedDate || self.modificationDate,
  };
  (self.detailText?.textAsTree ?? self.detailText?.textAsTree !== undefined) &&
    addProperty(detail, "structuredText", self.detailText.textAsTree, getPropertyName(self, "detailText"));
  (self.detailText?.textReferencedContent ?? self.detailText?.textReferencedContent !== undefined) &&
    addProperty(
      detail,
      "structuredTextLinks",
      self?.detailText.textReferencedContent?.map((item) => {
        return initializeBanner(item as CmTeasableFragment, rootSegment);
      })
    );
  (self.detailText?.text ?? self.detailText?.text !== undefined) &&
    addProperty(detail, "readTime", readTimeInMinutes(self.detailText?.text));
  self.media &&
    addProperty(
      detail,
      "media",
      self.media.map((item: any) => {
        return initializeMedia(item);
      }),
      getPropertyName(self, "media")
    );
  addAuthors(self, detail, rootSegment);
  addTags(self, detail, rootSegment);
  addCMProductOverrides(self, detail);
  addRelated(self, detail, rootSegment);
  return detail;
};

export const addRelated = (self: any, result: SupportsRelated, rootSegment: string) => {
  "related" in self &&
    self.related &&
    addProperty(
      result,
      "related",
      flattenItems(self.related)
        .filter(notEmpty)
        .map((item: any) => initializeBannerFor(item, rootSegment))
        .filter(notEmpty),
      getPropertyName(self, "related")
    );
};

export const initializeDetailFor = (self: any, rootSegment: string): Detail | DetailAuthor | null => {
  if (self.__typename.indexOf("CMPerson") >= 0) {
    return initializeDetailAuthor(self, rootSegment);
  } else if (self.__typename.indexOf("CM") >= 0) {
    return initializeDetail(self, rootSegment);
  }
  return null;
};
