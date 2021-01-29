import { Banner, initializeBanner } from "./Banner";
import { CMProduct as GraphQLCMProduct } from "../../queries/fragments/__generated__/CMProduct";
import { mapProperties } from "../../utils/ViewDispatcher/ModelHelper";

export const initializeCMProduct = (self: GraphQLCMProduct, rootSegment: string): Banner => {
  const banner: Banner = initializeBanner(self, rootSegment);
  const cmProductBanner: Banner = {
    ...mapProperties(self, { title: "productName" }, banner),
  };
  return cmProductBanner;
};
