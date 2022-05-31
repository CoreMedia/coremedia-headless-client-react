import { getPropertyName } from "../../utils/Preview/MetaData";
import { addProperty, mapProperties } from "../../utils/ViewDispatcher/ModelHelper";
import { Author, initializeAuthor } from "../Banner/Author";
import { addRelated, SupportsRelated } from "./Detail";

/**
 * @category ViewModels
 */
export interface DetailAuthor extends Author, SupportsRelated {
  jobTitle: string | null;
  organization: string | null;
  eMail: string | null;
  structuredText: any | null;
}

/**
 * Returns an [[DetailAuthor]] object based on the GraphQL [[DetailPerson]]
 */
export const initializeDetailAuthor = (self: any, rootSegment: string): DetailAuthor => {
  const detail: DetailAuthor = {
    ...initializeAuthor(self, rootSegment),
    ...mapProperties(self, {
      organization: "organization",
      jobTitle: "jobTitle",
      eMail: "eMail",
    }),
  };
  (self.detailText?.textAsTree ?? self.detailText?.textAsTree !== undefined) &&
    addProperty(detail, "structuredText", self.detailText.textAsTree, getPropertyName(self, "detailText"));
  addRelated(self, detail, rootSegment);
  return detail;
};
