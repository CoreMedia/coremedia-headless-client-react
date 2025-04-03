import React, { createElement } from "react";
import RichTextElement, { RichTextElementProps } from "./RichTextElement";
import { Attribute, slugify, TOC_ELEMENTS, transformAttributes } from "./RichTextHelper";

export interface DynamicComponentProps {
  name: string;
  children?: Array<RichTextElementProps>;
  attributes?: Array<Attribute>;
}

const DynamicComponent: React.FC<DynamicComponentProps> = ({ name, children, attributes }) => {
  const childrenToRender = (
    <>
      {children &&
        children.map((item, index) => {
          return <RichTextElement {...item} key={index} />;
        })}
    </>
  );

  // add id attribute for table of contents
  const props: any = { ...transformAttributes(attributes) };
  if (TOC_ELEMENTS.indexOf(name) >= 0 && children) {
    const text = children[0].data || "";
    props.id = slugify(text);
  }

  return createElement(name, props, childrenToRender);
};

export default DynamicComponent;
