import { Detail, initializeDetail } from "./Detail";
import { DetailCMProduct as GraphQLDetailCMProduct } from "../../queries/fragments/__generated__/DetailCMProduct";
import { createHref } from "../../utils/Link/LinkUtils";
import { getPropertyName } from "../../utils/Preview/MetaData";
import { addProperty, mapProperties } from "../../utils/ViewDispatcher/ModelHelper";

/**
 * @category ViewModels
 */
export interface Download {
  title: string | null;
  linkTarget: string | null;
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
 * @param rootSegment Needed for link building
 */
export const initializeDetailCMProduct = (self: GraphQLDetailCMProduct, rootSegment: string): DetailCMProduct => {
  const details: Detail = initializeDetail(self, rootSegment);
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
            linkTarget: createHref(download, rootSegment),
          }
        );
      }),
      getPropertyName(self, "downloads")
    );
  return productDetails;
};
