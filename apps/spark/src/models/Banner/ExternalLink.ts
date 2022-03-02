import { Banner, initializeBanner } from "./Banner";
import { ExternalLink as GraphQLExternalLink } from "@coremedia-labs/graphql-layer";
import { mapProperties } from "../../utils/ViewDispatcher/ModelHelper";
import { getLink } from "../../utils/Link/LinkUtils";

export const initializeExternalLink = (self: GraphQLExternalLink): Banner => {
  const banner: Banner = initializeBanner(self);
  const externalLink: Banner = {
    ...mapProperties(
      self,
      {
        linkTarget: "url",
        openInNewTab: "openInNewTab",
      },
      banner
    ),
    ...getLink(self),
  };
  externalLink.externalLink = true;

  if (externalLink.targets) {
    externalLink.targets[0] = {
      ...getLink(self),
    };
  }
  return externalLink;
};
