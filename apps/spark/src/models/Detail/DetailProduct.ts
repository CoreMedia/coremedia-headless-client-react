import { Grid } from "../Grid/Grid";
import { Picture } from "../Banner/Picture";
import { ProductBanner } from "../Banner/ProductBanner";

export interface DetailProduct extends ProductBanner {
  name: string | null;
  shortDescription: string | null;
  longDescription: string | null;
  grid: Grid | null;
  pictures: Array<Picture | null> | null;
}
