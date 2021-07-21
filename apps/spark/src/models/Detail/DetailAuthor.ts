import { Author, initializeAuthor } from "../Banner/Author";
import { Dispatchable } from "../../utils/ViewDispatcher/Dispatchable";
import { DetailPerson as GraphQLDetailPerson } from "../../queries/fragments/__generated__/DetailPerson";
import { getPropertyName } from "../../utils/Preview/MetaData";
import { addProperty, mapProperties } from "../../utils/ViewDispatcher/ModelHelper";

/**
 * @category ViewModels
 */
export interface DetailAuthor extends Author {
  jobTitle: string | null;
  organization: string | null;
  eMail: string | null;
  structuredText: any | null;
  related?: Array<Dispatchable | null> | null;
}

/**
 * Returns an [[DetailAuthor]] object based on the GraphQL [[DetailPerson]]
 * @param self
 */
export const initializeDetailAuthor = (self: GraphQLDetailPerson): DetailAuthor => {
  const detail: DetailAuthor = {
    ...initializeAuthor(self),
    ...mapProperties(self, {
      organization: "organization",
      jobTitle: "jobTitle",
      eMail: "eMail",
      structuredText: "detailTextAsTree",
    }),
  };
  self.related && addProperty(detail, "related", self.related, getPropertyName(self, "related"));
  return detail;
};
