import { Grid } from "../Grid/Grid";
import { Picture } from "../Banner/Picture";
import { CatalogPicture } from "../Banner/CatalogPicture";

export interface DetailProduct {
  name: string | null;
  shortDescription: string | null;
  longDescription: string | null;
  grid: Grid | null;
  pictures: Array<Picture | null> | null;
  catalogPicture: CatalogPicture | null;
}
