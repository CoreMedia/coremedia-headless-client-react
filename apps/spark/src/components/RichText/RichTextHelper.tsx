import { Dispatchable } from "../../utils/ViewDispatcher/Dispatchable";

export interface Attribute {
  _type: string;
  name: string;
  value: string;
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

export const containsItem = (embeddedItems: Array<Dispatchable>, id: string): Dispatchable | undefined => {
  return embeddedItems.find((item: any) => {
    if ("id" in item) {
      return item.id === id;
    }
    return false;
  });
};
