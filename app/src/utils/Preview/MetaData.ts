import { isPreview } from "./Preview";
import metaDataMapping from "../../__downloaded__/metadata.json";
import { Col } from "../../models/Grid/Grid";
import { Dispatchable } from "../ViewDispatcher/Dispatchable";

/**
 * @internal
 */
type metadata = { "data-cm-metadata": string } | undefined;
export type MetadataId = number | string;
export default interface PreviewMetadataProps {
  metadata?: {
    [P in keyof Omit<this, "metadata"> | "root"]?: MetadataId;
  };
}

/**
 * Generates the CoreMedia metadata JSON with id and optional properties.
 * @param contentId Id of the given content
 * @param propertyNames List of optional properties
 */
export const metaData = (contentId: MetadataId | undefined, ...propertyNames: Array<string | undefined>): metadata => {
  if (!isPreview() || !contentId) {
    return undefined;
  }

  const metadata = [];
  if (contentId) {
    if (typeof contentId == "number" || !contentId.startsWith("content/")) {
      contentId = "content/" + contentId;
    }
    metadata.push({ _: { $Ref: contentId } });
  }

  if (propertyNames) {
    propertyNames.forEach((propertyName) => {
      propertyName &&
        metadata.push({
          _: String(propertyName).startsWith("properties.") ? propertyName : "properties." + propertyName,
        });
    });
  }

  return { "data-cm-metadata": JSON.stringify(metadata) };
};

/**
 * Generates the CoreMedia metadata JSON with id.
 * @param contentId Id of the given content
 */
export const metaDataElement = (contentId: MetadataId | undefined): metadata => {
  if (!isPreview() || !contentId) {
    return undefined;
  }

  const metadata = [];
  metadata.push({ _: { $Ref: "content/" + contentId } });

  return { "data-cm-metadata": JSON.stringify(metadata) };
};

/**
 * Generates the CoreMedia metadata JSON with a property.
 * @param property The given property of a content
 */
export const metaDataProperty = (property: MetadataId | undefined): metadata => {
  if (!isPreview() || !property) {
    return undefined;
  }

  const metadata = [];
  metadata.push({ _: property });
  return { "data-cm-metadata": JSON.stringify(metadata) };
};

/**
 * Generates the CoreMedia metadata JSON for a [[PageGridPlacement]].
 * @param placement The given placement
 */
export const metaDataForPlacement = (placement: Col): metadata => {
  if (!isPreview()) {
    return undefined;
  }
  const hasItems = placement.items.length > 0;
  const metadata = [
    { _: `properties.placement-${placement.name}` },
    {
      placementRequest: [{ isInLayout: true, hasItems: hasItems, placementName: placement.name }],
    },
  ];

  return { "data-cm-metadata": JSON.stringify(metadata) };
};

/**
 * Generates the CoreMedia metadata JSON including the responsive device settings.
 * @param contentId Id of the page
 */
export const metaDataForResponsiveDevices = (contentId?: string | number): metadata => {
  if (!isPreview()) {
    return undefined;
  }

  const metadata = [];
  if (contentId) {
    if (typeof contentId == "number" || !contentId.startsWith("content/")) {
      contentId = "content/" + contentId;
    }
    metadata.push({ _: { $Ref: contentId } });
  }
  metadata.push({
    cm_responsiveDevices: {
      mobile_portrait: {
        width: 414,
        height: 736,
        order: 1,
        isDefault: "true",
      },
      mobile_landscape: { width: 736, height: 414, order: 2 },
      tablet_portrait: { width: 768, height: 1024, order: 3 },
      tablet_landscape: { width: 1024, height: 768, order: 4 },
      desktop: { width: 1200, order: 5 },
    },
    cm_preferredWidth: 1280,
  });

  return { "data-cm-metadata": JSON.stringify(metadata) };
};

/**
 * Helper to get the property name from metaDataMapping for a given content type,
 * falls back to the given propertyName if no mapping is found.
 * @param type The given content object
 * @param propertyName The name of of the property
 */
export function getPropertyName<S extends Dispatchable>(type: S, propertyName: keyof S): MetadataId {
  const mapping: { [key: string]: any } = metaDataMapping;
  const metaDataMappingElement: { [key: string]: string } = mapping[type.__typename];
  let property: string =
    (metaDataMappingElement && metaDataMappingElement[propertyName as string]) || (propertyName as string);
  //fallback to default
  if (!property) {
    property = "properties." + (propertyName as string);
  }
  return property;
}
