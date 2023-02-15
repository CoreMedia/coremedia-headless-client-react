import { CmProductDetailFragment } from "@coremedia-labs/graphql-layer";
import { getLink } from "../../utils/Link/LinkUtils";
import { getPropertyName } from "../../utils/Preview/MetaData";
import { addProperty, mapProperties } from "../../utils/ViewDispatcher/ModelHelper";
import { LinkAttributes } from "../../components/Link/Link";
import { Detail, initializeDetail } from "./Detail";

/**
 * @category ViewModels
 */
export interface Download extends LinkAttributes {
  title?: string;
  data?: { uri: string | null } | null;
}

/**
 * @category ViewModels
 */
export interface DetailCMProduct extends Detail {
  productCode: string | null;
  downloads?: Array<Download | null> | null;
}

/**
 * Returns a [[DetailCMProduct]] object based on the GraphQL [[DetailCMProduct]]
 */
export const initializeDetailCMProduct = (self: CmProductDetailFragment, rootSegment: string): DetailCMProduct => {
  const details: Detail = initializeDetail(self, rootSegment);
  const productDetails: DetailCMProduct = {
    ...mapProperties(self, { title: "productName", productCode: "productCode" }, details),
  };
  self.downloads &&
    addProperty(
      productDetails,
      "downloads",
      self.downloads.map((download) => {
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
