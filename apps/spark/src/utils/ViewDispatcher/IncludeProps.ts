import { Dispatchable } from "./Dispatchable";
import { PreviewMetadataProps } from "../Preview/MetaData";

export interface AdditionalIncludeParams {
  [key: string]:
    | string
    | number
    | boolean
    | Dispatchable
    | PreviewMetadataProps<any>
    | string[]
    | number[]
    | boolean[]
    | Dispatchable[]
    | AdditionalIncludeParams
    | AdditionalIncludeParams[];
}

export default interface IncludeProps<T extends Dispatchable = Dispatchable> {
  self: T;
  type?: string;
  view?: string;
  viewType?: string;
  params?: AdditionalIncludeParams;
}
