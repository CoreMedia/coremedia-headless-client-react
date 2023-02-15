import metaDataMapping from "@coremedia-labs/graphql-layer/dist/__downloaded__/metadata.json";
import { Dispatchable } from "../ViewDispatcher/Dispatchable";
import { isPreview } from "./Preview";

/**
 * @internal
 */
type metadata = { "data-cm-metadata": string } | undefined;
export interface MetadataRoot {
  id?: string | null;
  type?: string;
}

export interface PreviewMetadataProps<T> {
  properties?: { [P in keyof Omit<T, "metadata">]?: string };
  root: MetadataRoot;
}

export interface PreviewMetadata {
  metadata?: PreviewMetadataProps<this>;
}

export const initializeMetadata = (id: string | null | undefined, type = "content"): PreviewMetadata => {
  return { metadata: { root: { id: id, type: type }, properties: {} } };
};

/**
 * Generates the CoreMedia metadata JSON with id.
 * @param metadataRoot Id of the given content
 * @param propertyNames List of optional properties
 */
export const metaDataElement = (
  metadataRoot: MetadataRoot | undefined,
  ...propertyNames: Array<string | undefined>
): metadata => {
  if (!isPreview() || !metadataRoot) {
    return undefined;
  }
  const metadata = [];

  metadata.push({ _: { $Ref: (metadataRoot.type || "content") + "/" + metadataRoot.id } });

  if (propertyNames) {
    propertyNames.forEach((property) => {
      property &&
        metadata.push({
          _: property,
        });
    });
  }

  return { "data-cm-metadata": JSON.stringify(metadata) };
};

/**
 * Generates the CoreMedia metadata JSON with a property.
 * @param property The given property of a content
 */
export const metaDataProperty = (property: string | undefined): metadata => {
  if (!isPreview() || !property) {
    return undefined;
  }

  const metadata = [];
  metadata.push({ _: property });
  return { "data-cm-metadata": JSON.stringify(metadata) };
};

/**
 * Generates the CoreMedia metadata JSON for a [[PageGridPlacement]].
 * @param name The name of the placement
 * @param hasItems Wether this placement has items or not
 */
export const metaDataForPlacement = (name: string, hasItems?: boolean): metadata => {
  if (!isPreview()) {
    return undefined;
  }
  const metadata = [
    { _: `properties.placement-${name}` },
    {
      placementRequest: [{ isInLayout: true, hasItems: hasItems || false, placementName: name }],
    },
  ];

  return { "data-cm-metadata": JSON.stringify(metadata) };
};

/**
 * Generates the CoreMedia metadata JSON for a [[CampaignSlot]].
 * @param name The name of the slot
 * @param hasItems Wether this slot has items or not
 */
export const metaDataForCampaignSlot = (name: string, hasItems?: boolean): metadata => {
  if (!isPreview()) {
    return undefined;
  }
  const metadata = [
    { _: `properties.campaign-slot-${name}` },
    {
      campaignSlotRequest: [{ isInLayout: true, hasItems: hasItems || false, slotName: name }],
    },
  ];

  return { "data-cm-metadata": JSON.stringify(metadata) };
};

/**
 * Generates the CoreMedia metadata JSON including the responsive device settings.
 */
export const metaDataForResponsiveDevices = (): metadata => {
  if (!isPreview()) {
    return undefined;
  }

  const metadata = [
    {
      cm_responsiveDevices: {
        mobile_portrait: { width: 414, height: 736, order: 1, isDefault: "true" },
        mobile_landscape: { width: 736, height: 414, order: 2 },
        tablet_portrait: { width: 768, height: 1024, order: 3 },
        tablet_landscape: { width: 1024, height: 768, order: 4 },
      },
      cm_preferredWidth: 1200,
    },
  ];

  return { "data-cm-metadata": JSON.stringify(metadata) };
};

/**
 * Helper to get the property name from metaDataMapping for a given content type,
 * falls back to the given propertyName if no mapping is found.
 * @param type The given content object
 * @param propertyName The name of of the property
 */
export function getPropertyName<S extends Dispatchable>(type: S, propertyName: keyof S): string {
  let property = "properties." + (propertyName as string);
  const mapping: { [key: string]: any } = metaDataMapping;
  if (type.__typename) {
    const metaDataMappingElement: { [key: string]: string } = mapping[type.__typename];
    property = (metaDataMappingElement && metaDataMappingElement[propertyName as string]) || (propertyName as string);
  }
  return property;
}
