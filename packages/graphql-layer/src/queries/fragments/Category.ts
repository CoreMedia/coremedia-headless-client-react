import { Category as GeneratedCategory } from "./__generated__/Category";

export interface Category extends GeneratedCategory {
  __typename: "CategoryImpl";
  children: Array<any | null> | null;
}
