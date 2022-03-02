import PreviewMetadata from "../../utils/Preview/MetaData";
import { LinkAttributes } from "../../components/Link/Link";

export interface Tag extends PreviewMetadata, LinkAttributes {
  name?: string;
}
