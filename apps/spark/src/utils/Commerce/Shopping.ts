import { ProductTeaser } from "../../queries/fragments/__generated__/ProductTeaser";
import { ExternalProduct } from "../../queries/fragments/__generated__/ExternalProduct";

/**
 *
 * @param productTeaser
 */
export const isShopNowEnabled = (productTeaser: ProductTeaser | ExternalProduct): boolean => {
  if (productTeaser.shopNowSetting) {
    const showNowSetting: { shopNow: string } = productTeaser.shopNowSetting;
    if (showNowSetting.shopNow) {
      if (showNowSetting.shopNow === "enabled") {
        return true;
      } else if (showNowSetting.shopNow === "disabled") {
        return false;
      }
    }
  }
  return true;
};
