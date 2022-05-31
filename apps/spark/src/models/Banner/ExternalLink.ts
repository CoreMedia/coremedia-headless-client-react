import { addProperty } from "../../utils/ViewDispatcher/ModelHelper";
import { Banner } from "./Banner";

export const addExternalLinkOverrides = (self: any, result: Banner): void => {
  if ("openInNewTab" in self) {
    addProperty(result, "openInNewTab", self.openInNewTab);
    result.externalLink = true;

    if (result.targets) {
      result.targets[0].linkTarget = self.url ?? "";
      result.targets[0].openInNewTab = self.openInNewTab || false;
      result.targets[0].externalLink = true;
    }
  }
};
