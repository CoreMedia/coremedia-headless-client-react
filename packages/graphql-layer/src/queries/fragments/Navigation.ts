import { Navigation as GeneratedNavigation } from "./__generated__/Navigation";
import { TeasableForNavigation } from "./navigation/__generated__/TeasableForNavigation";

export interface Navigation extends GeneratedNavigation {
  __typename: "CMAbstractCategoryImpl" | "CMChannelImpl" | "CMExternalPageImpl" | "CMNavigationImpl";
  children: Array<Navigation | null> | null;
}

export interface NavigationForNavigation extends TeasableForNavigation {
  __typename: "CMAbstractCategoryImpl" | "CMChannelImpl" | "CMExternalPageImpl" | "CMNavigationImpl";
  children: Array<NavigationForNavigation | null> | null;
}
