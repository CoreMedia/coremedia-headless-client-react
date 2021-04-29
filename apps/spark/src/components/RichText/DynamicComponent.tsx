import React, { createElement } from "react";
import RichTextElement, { RichTextElementProps } from "./RichTextElement";
import { Attribute, transformAttributes } from "./RichTextHelper";

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
  return createElement(name, transformAttributes(attributes), childrenToRender);
};

export default DynamicComponent;
