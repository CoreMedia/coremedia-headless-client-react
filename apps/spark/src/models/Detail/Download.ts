import { LinkAttributes } from "../../components/Link/Link";

/**
 * @category ViewModels
 */
export interface Download extends LinkAttributes {
  title?: string;
  data?: { uri: string | null } | null;
}
