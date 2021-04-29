import { Dispatchable } from "../../utils/ViewDispatcher/Dispatchable";
import { Navigation } from "./__generated__/Navigation";
import { ExternalChannel as GeneratedExternalChannel } from "./__generated__/ExternalChannel";

export interface ExternalNavigation extends Dispatchable, GeneratedExternalChannel, Navigation {
  __typename: "CMExternalChannelImpl";
  children: Array<Dispatchable | null> | null;
}
