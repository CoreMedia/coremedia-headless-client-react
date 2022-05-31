import { DetailCMProduct as GraphQLDetailCMProduct } from "@coremedia-labs/graphql-layer";
import { LinkAttributes } from "../../components/Link/Link";
import { getLink } from "../../utils/Link/LinkUtils";
import { getPropertyName } from "../../utils/Preview/MetaData";
import { addProperty, mapProperties } from "../../utils/ViewDispatcher/ModelHelper";
import { Detail, initializeDetail } from "./Detail";

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
            ...getLink(download, rootSegment),
          }
        );
      }),
      getPropertyName(self, "downloads")
    );
  return productDetails;
};
