import React, { createElement } from "react";
import { Attribute, handleEmbeddedLinks, transformAttributes } from "./RichTextHelper";
import DynamicComponent from "./DynamicComponent";

export interface RichTextElementProps {
  _type: string;
  name: string;
  attributes?: Array<Attribute>;
  children?: Array<RichTextElementProps>;
  data?: string;
}

const RichTextElement: React.FC<RichTextElementProps> = ({ _type, name, attributes, children, data }) => {
  if (_type === "Element" || _type === "EmptyElement") {
    //embedded item within richtext, do not render the p but the a directly
    if (
      name === "p" &&
      children &&
      children.filter((child) => {
        return child.name === "a" || child.name === "img";
      }).length > 0
    ) {
      return (
        <>
          {children.map((item, index) => {
            return <RichTextElement {...item} key={index} />;
          })}
        </>
      );
    } else if (name === "a" || name === "img") {
      if (attributes) {
        return <>{handleEmbeddedLinks(attributes, children)}</>;
      }
    } else if (name === "br") {
      return createElement(name, transformAttributes(attributes));
    } else {
      return (
        <DynamicComponent name={name} attributes={attributes}>
          {children}
        </DynamicComponent>
      );
    }
  } else if (_type === "Characters") {
    return <>{data}</>;
  } else {
    console.warn("Ignoring unknown RichText Type", _type);
  }
  return null;
};

export default RichTextElement;
