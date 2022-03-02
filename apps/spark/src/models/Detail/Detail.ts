import PreviewMetadata, { getPropertyName } from "../../utils/Preview/MetaData";
import { Tag } from "../Banner/Tag";
import { Dispatchable } from "../../utils/ViewDispatcher/Dispatchable";
import { Author, initializeAuthor } from "../Banner/Author";
import { DetailTeasable } from "@coremedia-labs/graphql-layer";
import { readTimeInMinutes } from "../../utils/Richtext/ReadTime";
import { Person } from "@coremedia-labs/graphql-layer";
import { addProperty, mapProperties } from "../../utils/ViewDispatcher/ModelHelper";
import { getLink } from "../../utils/Link/LinkUtils";

/**
 * @category ViewModels
 */
export interface Detail extends PreviewMetadata {
  title: string | null;
  readTime: number | null;
  structuredText: any | null;
  structuredTextLinks: Array<Dispatchable | null>;
  authors?: Array<Author | null>;
  tags?: Array<Tag | null>;
  related?: Array<Dispatchable | null>;
  displayDate?: string;
  media: Array<Dispatchable | null> | null;
}

/**
 * Returns a [[Detail]] object based on the GraphQL [[DetailTeasable]]
 * @param self
 */
export const initializeDetail = (self: DetailTeasable): Detail => {
  const detail: Detail = {
    ...mapProperties(self, { title: "title", media: "media" }),
    displayDate: self.extDisplayedDate || self.modificationDate,
  };
  (self.detailText?.textAsTree ?? self.detailText?.textAsTree !== undefined) &&
    addProperty(detail, "structuredText", self.detailText.textAsTree, getPropertyName(self, "detailText"));
  (self.detailText?.textReferencedContent ?? self.detailText?.textReferencedContent !== undefined) &&
    addProperty(detail, "structuredTextLinks", self.detailText.textReferencedContent);
  (self.detailText?.text ?? self.detailText?.text !== undefined) &&
    addProperty(detail, "readTime", readTimeInMinutes(self.detailText?.text));
  self.authors &&
    addProperty(
      detail,
      "authors",
      self.authors.map((author) => {
        return initializeAuthor(author as Person);
      }),
      getPropertyName(self, "authors")
    );
  self.subjectTaxonomy &&
    addProperty(
      detail,
      "tags",
      self.subjectTaxonomy.map((tag): Tag | null => {
        return (
          tag && {
            name: tag.value || undefined,
            ...getLink(tag),
            ...mapProperties(self, { tag: "value" }),
          }
        );
      }),
      getPropertyName(self, "subjectTaxonomy")
    );

  self.related && addProperty(detail, "related", self.related, getPropertyName(self, "related"));
  return detail;
};
