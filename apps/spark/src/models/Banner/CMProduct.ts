import { Banner, initializeBanner } from "./Banner";
import { CMProduct as GraphQLCMProduct } from "@coremedia-labs/graphql-layer";
import { mapProperties } from "../../utils/ViewDispatcher/ModelHelper";

export const initializeCMProduct = (self: GraphQLCMProduct): Banner => {
  const banner: Banner = initializeBanner(self);
  return {
    ...mapProperties(self, { title: "productName" }, banner),
  };
};
