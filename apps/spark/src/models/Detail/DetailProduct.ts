import { Banner } from "../Banner/Banner";
import { Picture } from "../Banner/Picture";
import { Download } from "./Download";

export interface DetailProduct extends Banner {
  name?: string | null;
  shortDescription?: string | null;
  longDescription?: string | null;
  id?: string | null;
  pictures?: Array<Picture | null> | null;
  downloads?: Array<Download | null> | null;
}
