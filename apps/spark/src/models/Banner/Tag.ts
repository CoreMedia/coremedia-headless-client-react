import { LinkAttributes } from "../../components/Link/Link";
import { getLink } from "../../utils/Link/LinkUtils";
import { PreviewMetadata, getPropertyName } from "../../utils/Preview/MetaData";
import { addProperty, mapProperties } from "../../utils/ViewDispatcher/ModelHelper";

export interface SupportsTags extends PreviewMetadata {
  tags?: Array<Tag | null>;
}

export interface Tag extends PreviewMetadata, LinkAttributes {
  name?: string;
  translations?: any;
}

export const addTags = (self: any, result: SupportsTags, rootSegment: string): void => {
  if (self.subjectTaxonomy) {
    addProperty(
      result,
      "tags",
      self.subjectTaxonomy.map((taxonomy: any): Tag | null => {
        return (
          taxonomy && {
            ...mapProperties(taxonomy, { name: "value" }),
            ...mapProperties(taxonomy.translations, { translations: "translations" }),
            ...getLink(taxonomy, rootSegment),
          }
        );
      }),
      getPropertyName(self, "subjectTaxonomy")
    );
  }
};
