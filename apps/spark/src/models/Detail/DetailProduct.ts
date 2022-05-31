import { Banner } from "../Banner/Banner";
import { Picture } from "../Banner/Picture";
import { Grid } from "../Grid/Grid";

export interface DetailProduct extends Banner {
  name: string | null;
  shortDescription: string | null;
  longDescription: string | null;
  grid: Grid | null;
  pictures: Array<Picture | null> | null;
}
