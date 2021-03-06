import PreviewMetadataProps, { getPropertyName } from "../../utils/Preview/MetaData";
import { Picture } from "./Picture";
import { Person } from "../../queries/fragments/__generated__/Person";
import { createHref } from "../../utils/Link/LinkUtils";
import { addProperty, mapProperties } from "../../utils/ViewDispatcher/ModelHelper";

/**
 * @category ViewModels
 */
export interface Author extends PreviewMetadataProps {
  title: string | null; // what is this for?
  displayName: string | null;
  linkTarget: string | null;
  text: string | null;
  picture: Picture | null;
}

/**
 * Returns an [[Author]] object based on the GraphQL [[Person]]
 * @param person
 * @param rootSegment Needed for link building
 */
export const initializeAuthor = (person: Person, rootSegment: string): Author => {
  const author: Author = {
    linkTarget: createHref(person, rootSegment),
    ...mapProperties(person, { text: "teaserText", title: "title", picture: "picture" }),
  };
  const displayName: string | undefined =
    ((person.displayName || person.firstName || person.lastName) && person.displayName) ||
    `${person.firstName} ${person.lastName}`;
  displayName && addProperty(author, "displayName", displayName, getPropertyName(person, "displayName"));
  return author;
};
