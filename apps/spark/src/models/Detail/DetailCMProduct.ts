import { Detail, initializeDetail } from "./Detail";
import { DetailCMProduct as GraphQLDetailCMProduct } from "@coremedia-labs/graphql-layer";
import { getLink } from "../../utils/Link/LinkUtils";
import { getPropertyName } from "../../utils/Preview/MetaData";
import { addProperty, mapProperties } from "../../utils/ViewDispatcher/ModelHelper";
import { LinkAttributes } from "../../components/Link/Link";

/**
 * @category ViewModels
 */
export interface Download extends LinkAttributes {
  title: string | null;
}

/**
 * @category ViewModels
 */
export interface DetailCMProduct extends Detail {
  downloads?: Array<Download | null> | null;
  productCode: string | null;
}

/**
 * Returns a [[DetailCMProduct]] object based on the GraphQL [[DetailCMProduct]]
 * @param self
 */
export const initializeDetailCMProduct = (self: GraphQLDetailCMProduct): DetailCMProduct => {
  const details: Detail = initializeDetail(self);
  const productDetails: DetailCMProduct = {
    ...mapProperties(self, { title: "productName", productCode: "productCode" }, details),
  };
  self.downloads &&
    addProperty(
      productDetails,
      "downloads",
      self.downloads.map((download): Download | null => {
        return (
          download && {
            title: download.teaserTitle,
            ...getLink(download),
          }
        );
      }),
      getPropertyName(self, "downloads")
    );
  return productDetails;
};
