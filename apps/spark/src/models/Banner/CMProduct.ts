import { addProperty } from "../../utils/ViewDispatcher/ModelHelper";
import { Banner } from "./Banner";

export const addCMProductOverrides = (self: any, result: Banner): void => {
  if ("productName" in self) {
    addProperty(result, "title", self.productName);
  }
};
