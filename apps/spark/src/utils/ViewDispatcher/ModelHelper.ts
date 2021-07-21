import PreviewMetadata, { getPropertyName, initializeMetadata } from "../Preview/MetaData";
import { Dispatchable } from "./Dispatchable";

/**
 *
 * @param source where to get the properties from
 * @param toMap the properties to map
 * @param baseTarget an object to use existing config from
 * @param baseType the metadata type. defaults to content
 */
export function mapProperties<S extends Dispatchable, T extends PreviewMetadata>(
  source: S,
  toMap: {
    [P in keyof Omit<T, keyof PreviewMetadata>]?: keyof S;
  },
  baseTarget?: any,
  baseType = "content"
): T {
  const result: any = { ...initializeMetadata(source["id" as keyof S] + "", baseType), ...baseTarget };
  Object.keys(toMap).forEach((key: string) => {
    const keyOfT = key as keyof Omit<T, keyof PreviewMetadata>;
    const keyOfS = toMap[keyOfT] as keyof S;
    // no check here if the types of the source and the target property match!
    result[keyOfT] = source[keyOfS];
    result.metadata.properties[keyOfT] = getPropertyName(source, keyOfS);
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
export function addProperty<T extends PreviewMetadata>(
  result: T,
  keyOfT: keyof Omit<T, keyof PreviewMetadata>,
  value: T[Exclude<keyof T, "metadata">],
  metaDataProperty?: string
): T {
  result[keyOfT] = value;
  result.metadata = result.metadata || { properties: {}, root: { id: "", type: "" } };
  result.metadata.properties = result.metadata.properties || {};
  //result.metadata.properties = result.metadata?.properties || {};
  if (metaDataProperty) {
    result.metadata.properties[keyOfT] = metaDataProperty;
  }
  return result;
}
