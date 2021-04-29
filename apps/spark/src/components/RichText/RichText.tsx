import React from "react";
import RichTextElement, { RichTextElementProps } from "./RichTextElement";
import "./RichText.scss";

interface Props {
  text: RichTextElementProps;
  cssClass?: string | undefined;
}

const RichText: React.FC<Props> = ({ text, cssClass = "" }) => {
  return (
    <div className={`cm-richtext ${cssClass}`}>
      {text.children &&
        text.children.map((item, index) => {
          return <RichTextElement {...item} key={index} />;
        })}
    </div>
  );
};

export default RichText;
