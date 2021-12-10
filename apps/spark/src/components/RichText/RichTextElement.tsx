import React, { createElement } from "react";
import { Attribute, containsItem, getAttributeValueFor, getContentId, transformAttributes } from "./RichTextHelper";
import DynamicComponent from "./DynamicComponent";
import { useRichtextContextState } from "./context/RichtextContextProvider";
import Link from "../Link/Link";
import Include from "../../utils/ViewDispatcher/Include";

export interface RichTextElementProps {
  _type: string;
  name: string;
  attributes?: Array<Attribute>;
  children?: Array<RichTextElementProps>;
  data?: string;
}

const RichTextElement: React.FC<RichTextElementProps> = ({ _type, name, attributes, children, data }) => {
  const { embeddedItems } = useRichtextContextState();
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
        const childrenToRender = (
          <>
            {children &&
              children.map((item, index) => {
                return <RichTextElement {...item} key={index} />;
              })}
          </>
        );

        const href = getAttributeValueFor(attributes, "href");
        //external link
        if (href) {
          return <Link to={href}>{childrenToRender}</Link>;
        } else {
          //embedded image
          const dataSrc = getContentId(attributes, "data-src");
          if (dataSrc) {
            const content = containsItem(embeddedItems, dataSrc);
            return <>{content && <Include self={content} view={"asRichtextEmbed"} />}</>;
          } else {
            //embedded content into richtext
            const contentId = getContentId(attributes, "data-href");
            if (contentId) {
              const content = containsItem(embeddedItems, contentId);
              const embeddingType = getAttributeValueFor(attributes, "data-show");
              if (embeddingType === "embed") {
                return <>{content && <Include self={content} view={"asRichtextEmbed"} />}</>;
              } else {
                return <>{content && <Link to={content}>{childrenToRender}</Link>}</>;
              }
            }
          }
        }
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
