import { Grid } from "../Grid/Grid";

export interface DetailCategory {
  shortId: string | null;
  name: string | null;
  shortDescription: string | null;
  longDescription: string | null;
  grid: Grid | null;
}
