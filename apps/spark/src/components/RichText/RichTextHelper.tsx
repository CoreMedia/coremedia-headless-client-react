import { Banner } from "../../models/Banner/Banner";

// List of DOM elements to consider for TOC generation.
export const TOC_ELEMENTS = ["h1", "h2", "h3", "h4", "h5", "h6"];

export interface Attribute {
  _type: string;
  name: string;
  value: string;
  id?: string;
}

export const getAttributeValueFor = (attributes: Array<Attribute>, name: string): string | undefined => {
  let result: string | undefined = undefined;
  const hrefAttributes: Array<Attribute> = attributes.filter((attibute) => {
    return attibute.name === name;
  });
  if (hrefAttributes && hrefAttributes.length > 0) {
    hrefAttributes.forEach((item) => {
      result = item.value;
    });
  }
  return result;
};

export const getContentId = (attributes: Array<Attribute>, fullString: string): string | undefined => {
  const dataHref = getAttributeValueFor(attributes, fullString);
  if (dataHref && dataHref.startsWith("coremedia:")) {
    const splitted: string[] = dataHref.split("/");
    return splitted[splitted.length - 1];
  }
  return undefined;
};

export const transformAttributes = (attributes?: Array<Attribute>): { class: string } | null => {
  const className: string | undefined = attributes && getAttributeValueFor(attributes, "class");
  if (className) {
    return { class: className };
  } else {
    return null;
  }
};

export const containsItem = (embeddedItems: Array<Banner>, id: string): Banner | undefined => {
  return embeddedItems.find((item: Banner) => {
    return item.metadata?.root.id === id;
  });
};

/**
 * Create a slug for the provided link text by
 * - converting the provided link text to lowercase
 * - trimming leading or trailing white space
 * - removing all non-alphanumeric characters
 * - replacing spaces with hyphens
 * - removing consecutive hyphens
 *
 * @param linkText link text
 */
export const slugify = (linkText: string): string => {
  return linkText
    .toLowerCase()
    .replace(/^\s+|\s+$/g, "")
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};
