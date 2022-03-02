import { LinkAttributes } from "../../components/Link/Link";

export interface Target extends LinkAttributes {
  callToActionEnabled?: boolean;
  callToActionText?: string;
}
