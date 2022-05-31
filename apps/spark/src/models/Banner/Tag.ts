import { LinkAttributes } from "../../components/Link/Link";
import { getLink } from "../../utils/Link/LinkUtils";
import { PreviewMetadata, getPropertyName } from "../../utils/Preview/MetaData";
import { addProperty, mapProperties } from "../../utils/ViewDispatcher/ModelHelper";

export interface SupportsTags extends PreviewMetadata {
  tags?: Array<Tag | null>;
}

export const addTags = (self: any, result: SupportsTags, rootSegment: string): void => {
  "subjectTaxonomy" in self &&
    addProperty(
      result,
      "tags",
      self.subjectTaxonomy.map((taxonomy: any): Tag | null => {
        return (
          taxonomy && {
            ...mapProperties(taxonomy, { name: "value" }),
            ...getLink(taxonomy, rootSegment),
          }
        );
      }),
      getPropertyName(self, "subjectTaxonomy")
    );
};

export interface Tag extends PreviewMetadata, LinkAttributes {
  name?: string;
}
