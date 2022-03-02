import { Navigation } from "./__generated__/Navigation";
import { ExternalChannel as GeneratedExternalChannel } from "./__generated__/ExternalChannel";
import { ExternalChannelForNavigation } from "./navigation/__generated__/ExternalChannelForNavigation";

export interface ExternalNavigation extends GeneratedExternalChannel, Navigation {
  __typename: "CMExternalChannelImpl";
  children: Array<any | null> | null;
}

export interface ExternalNavigationForNavigation extends ExternalChannelForNavigation {
  __typename: "CMExternalChannelImpl";
  children: Array<any | null> | null;
}
