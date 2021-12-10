import React from "react";
import RichTextElement, { RichTextElementProps } from "./RichTextElement";
import "./RichText.scss";
import { Dispatchable } from "../../utils/ViewDispatcher/Dispatchable";
import { RichtextContextProvider } from "./context/RichtextContextProvider";

interface Props {
  text: RichTextElementProps;
  embeddedItems?: Array<Dispatchable | null>;
  cssClass?: string | undefined;
}

const RichText: React.FC<Props> = ({ text, embeddedItems, cssClass = "" }) => {
  return (
    <RichtextContextProvider items={embeddedItems}>
      <div className={`cm-richtext ${cssClass}`}>
        {text.children &&
          text.children.map((item, index) => {
            return <RichTextElement {...item} key={index} />;
          })}
      </div>
    </RichtextContextProvider>
  );
};

export default RichText;
