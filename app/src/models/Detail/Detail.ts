import PreviewMetadataProps, { getPropertyName } from "../../utils/Preview/MetaData";
import { Tag } from "../Banner/Tag";
import { Dispatchable } from "../../utils/ViewDispatcher/Dispatchable";
import { Author, initializeAuthor } from "../Banner/Author";
import { DetailTeasable } from "../../queries/fragments/__generated__/DetailTeasable";
import { readTimeInMinutes } from "../../utils/Richtext/ReadTime";
import { Person } from "../../queries/fragments/__generated__/Person";
import { addProperty, mapProperties } from "../../utils/ViewDispatcher/ModelHelper";

/**
 * @category ViewModels
 */
export interface Detail extends PreviewMetadataProps {
  title: string | null;
  readTime: number | null;
  structuredText: any | null;
  authors?: Array<Author | null>;
  tags?: Array<Tag | null>;
  related?: Array<Dispatchable | null>;
  displayDate?: string;
  media: Array<Dispatchable | null> | null;
}

/**
 * Returns a [[Detail]] object based on the GraphQL [[DetailTeasable]]
 * @param self
 * @param rootSegment Needed for link building
 */
export const initializeDetail = (self: DetailTeasable, rootSegment: string): Detail => {
  const detail: Detail = {
    readTime: readTimeInMinutes(self.detailText),
    displayDate: self.extDisplayedDate || self.modificationDate,
    ...mapProperties(self, { structuredText: "detailTextAsTree", title: "title", media: "media" }),
  };
  self.authors &&
    addProperty(
      detail,
      "authors",
      self.authors.map((author) => {
        return initializeAuthor(author as Person, rootSegment);
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
            metadata: { root: tag.id, name: getPropertyName(tag, "value") },
          }
        );
      }),
      getPropertyName(self, "subjectTaxonomy")
    );

  self.related && addProperty(detail, "related", self.related, getPropertyName(self, "related"));
  return detail;
};
