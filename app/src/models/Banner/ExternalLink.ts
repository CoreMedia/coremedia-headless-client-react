import { Banner, initializeBanner } from "./Banner";
import { ExternalLink as GraphQLExternalLink } from "../../queries/fragments/__generated__/ExternalLink";
import { mapProperties } from "../../utils/ViewDispatcher/ModelHelper";

export const initializeExternalLink = (self: GraphQLExternalLink, rootSegment: string): Banner => {
  const banner: Banner = initializeBanner(self, rootSegment);
  const externalLink: Banner = {
    ...mapProperties(
      self,
      {
        linkTarget: "url",
        openInNewTab: "openInNewTab",
      },
      banner
    ),
  };
  externalLink.externalLink = true;

  if (externalLink.targets) {
    externalLink.targets[0].target = self.url ?? "";
    externalLink.targets[0].openInNewTab = self.openInNewTab || false;
    externalLink.targets[0].externalLink = true;
  }
  return externalLink;
};
