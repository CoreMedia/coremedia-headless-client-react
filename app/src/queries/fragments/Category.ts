import { Dispatchable } from "../../utils/ViewDispatcher/Dispatchable";
import { Category as GeneratedCategory } from "./__generated__/Category";

export interface Category extends Dispatchable, GeneratedCategory {
  __typename: "CategoryImpl";
  children: Array<Dispatchable | null> | null;
}
