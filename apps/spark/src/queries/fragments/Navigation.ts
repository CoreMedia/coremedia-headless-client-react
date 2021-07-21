import { Dispatchable } from "../../utils/ViewDispatcher/Dispatchable";
import { Navigation as GeneratedNavigation } from "./__generated__/Navigation";
import { TeasableForNavigation } from "./navigation/__generated__/TeasableForNavigation";

export interface Navigation extends Dispatchable, GeneratedNavigation {
  __typename: "CMAbstractCategoryImpl" | "CMChannelImpl" | "CMExternalPageImpl" | "CMNavigationImpl";
  children: Array<Dispatchable | null> | null;
}

export interface NavigationForNavigation extends Dispatchable, TeasableForNavigation {
  __typename: "CMAbstractCategoryImpl" | "CMChannelImpl" | "CMExternalPageImpl" | "CMNavigationImpl";
  children: Array<Dispatchable | null> | null;
}
