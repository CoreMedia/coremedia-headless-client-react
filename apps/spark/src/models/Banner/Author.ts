import { CmPersonFragment } from "@coremedia-labs/graphql-layer";
import { getLink } from "../../utils/Link/LinkUtils";
import { PreviewMetadata, getPropertyName } from "../../utils/Preview/MetaData";
import { addProperty, mapProperties } from "../../utils/ViewDispatcher/ModelHelper";
import { Picture } from "./Picture";

export interface SupportsAuthors extends PreviewMetadata {
  authors?: Array<Author>;
}

export const addAuthors = (self: any, result: SupportsAuthors, rootSegment: string): void => {
  "authors" in self &&
    addProperty(
      result,
      "authors",
      self.authors.map((author: CmPersonFragment) => {
        return initializeAuthor(author, rootSegment);
      }),
      getPropertyName(self, "authors")
    );
};

/**
 * @category ViewModels
 */
export interface Author extends PreviewMetadata {
  displayName: string | null;
  linkTarget: string | null;
  text: string | null;
  picture: Picture | null;
}

/**
 * Returns an [[Author]] object based on the GraphQL [[Person]]
 */
export const initializeAuthor = (person: CmPersonFragment, rootSegment: string): Author => {
  const author: Author = {
    ...mapProperties(person, { picture: "picture" }),
    ...getLink(person, rootSegment),
  };
  person.teaserText?.text &&
    addProperty(author, "text", person.teaserText?.text, getPropertyName(person, "teaserText"));
  const displayName: string | undefined =
    ((person.displayName || person.firstName || person.lastName) && person.displayName) ||
    `${person.firstName} ${person.lastName}`;
  displayName && addProperty(author, "displayName", displayName, getPropertyName(person, "displayName"));
  return author;
};
