import { PreviewMetadata } from "../../utils/Preview/MetaData";
import { addProperty } from "../../utils/ViewDispatcher/ModelHelper";
import { Banner } from "./Banner";

export interface SupportsStaticCode extends PreviewMetadata {
  code?: string | null;
}

export const addStaticCode = (self: any, result: Banner): void => {
  if (self.html) {
    addProperty(result, "code", self.html);
    result.picture = undefined;
    result.plaintext = null;
    result.text = undefined;
    result.targets = undefined;
    result.title = null;
    result.shopNowConfiguration = false;
  }
};
