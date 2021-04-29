import { Dispatchable } from "../../utils/ViewDispatcher/Dispatchable";
import { Navigation as GeneratedNavigation } from "./__generated__/Navigation";

export interface Navigation extends Dispatchable, GeneratedNavigation {
  __typename: "CMAbstractCategoryImpl" | "CMChannelImpl" | "CMExternalPageImpl" | "CMNavigationImpl";
  children: Array<Dispatchable | null> | null;
}
