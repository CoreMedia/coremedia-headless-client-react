import PreviewMetadataProps, { getPropertyName, MetadataId } from "../Preview/MetaData";
import { Dispatchable } from "./Dispatchable";

/**
 *
 * @param source
 * @param toMap
 * @param baseTarget
 */
export function mapProperties<S extends Dispatchable, T extends PreviewMetadataProps>(
  source: S,
  toMap: {
    [P in keyof Omit<T, keyof PreviewMetadataProps>]?: keyof S;
  },
  baseTarget?: any
): T {
  toMap = { ...toMap, root: "id" };
  const result: any = baseTarget || {};
  result.metadata = result.metadata || {};
  Object.keys(toMap).forEach((key: string) => {
    const keyOfT = key as keyof Omit<T, keyof PreviewMetadataProps>;
    const keyOfS = toMap[keyOfT] as keyof S;
    if (keyOfS !== "id") {
      // no check here if the types of the source and the target property match!
      result[keyOfT] = source[keyOfS];
      result.metadata[keyOfT] = getPropertyName(source, keyOfS);
    } else if (source[keyOfS]) {
      result.metadata[keyOfT] = source[keyOfS];
    }
  });
  return result as T;
}

/**
 *
 * @param result
 * @param keyOfT
 * @param value
 * @param metaDataProperty
 */
export function addProperty<T extends PreviewMetadataProps>(
  result: T,
  keyOfT: keyof Omit<T, keyof PreviewMetadataProps>,
  value: T[Exclude<keyof T, "metadata">],
  metaDataProperty?: MetadataId
): T {
  result[keyOfT] = value;
  result.metadata = result.metadata || {};
  if (metaDataProperty) {
    result.metadata[keyOfT] = metaDataProperty;
  }
  return result;
}
