import { addProperty } from "../../utils/ViewDispatcher/ModelHelper";

export const addCMProductTitle = (self: any, result: any): void => {
  if (self.productName) {
    addProperty(result, "title", self.productName);
  }
};
