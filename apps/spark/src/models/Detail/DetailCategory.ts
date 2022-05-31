import { PreviewMetadata } from "../../utils/Preview/MetaData";
import { Grid } from "../Grid/Grid";

export interface DetailCategory extends PreviewMetadata {
  shortId: string | null;
  name: string | null;
  shortDescription: string | null;
  longDescription: string | null;
  grid: Grid | null;
}
