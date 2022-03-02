import PreviewMetadata, { getPropertyName } from "../../utils/Preview/MetaData";
import { Picture } from "./Picture";
import { Person } from "@coremedia-labs/graphql-layer";
import { getLink } from "../../utils/Link/LinkUtils";
import { addProperty, mapProperties } from "../../utils/ViewDispatcher/ModelHelper";

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
 * @param person
 */
export const initializeAuthor = (person: Person): Author => {
  const author: Author = {
    ...mapProperties(person, { title: "title", picture: "picture" }),
    ...getLink(person),
  };
  (person.teaserText?.text ?? person.teaserText?.text !== undefined) &&
    addProperty(author, "text", person.teaserText?.text, getPropertyName(person, "teaserText"));
  const displayName: string | undefined =
    ((person.displayName || person.firstName || person.lastName) && person.displayName) ||
    `${person.firstName} ${person.lastName}`;
  displayName && addProperty(author, "displayName", displayName, getPropertyName(person, "displayName"));
  return author;
};
