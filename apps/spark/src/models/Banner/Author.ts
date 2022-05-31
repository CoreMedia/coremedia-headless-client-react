import { Person } from "@coremedia-labs/graphql-layer";
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
      self.authors.map((author: Person) => {
        return initializeAuthor(author, rootSegment);
      }),
      getPropertyName(self, "authors")
    );
};

/**
 * @category ViewModels
 */
export interface Author extends PreviewMetadata {
  title: string | null; // what is this for?
  displayName: string | null;
  linkTarget: string | null;
  text: string | null;
  picture: Picture | null;
}

/**
 * Returns an [[Author]] object based on the GraphQL [[Person]]
 */
export const initializeAuthor = (person: Person, rootSegment: string): Author => {
  const author: Author = {
    ...mapProperties(person, { title: "title", picture: "picture" }),
    ...getLink(person, rootSegment),
  };
  (person.teaserText?.text ?? person.teaserText?.text !== undefined) &&
    addProperty(author, "text", person.teaserText?.text, getPropertyName(person, "teaserText"));
  const displayName: string | undefined =
    ((person.displayName || person.firstName || person.lastName) && person.displayName) ||
    `${person.firstName} ${person.lastName}`;
  displayName && addProperty(author, "displayName", displayName, getPropertyName(person, "displayName"));
  return author;
};
