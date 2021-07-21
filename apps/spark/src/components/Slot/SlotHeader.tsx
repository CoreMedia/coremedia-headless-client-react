import React from "react";
import PreviewMetadata, { metaDataProperty } from "../../utils/Preview/MetaData";

interface Props extends PreviewMetadata {
  title?: string;
  text?: string;
}

const SlotHeader: React.FC<Props> = ({ title, text, metadata }) => {
  return (
    <>
      {title && (
        <h2 className={`cm-slot__headline`} {...metaDataProperty(metadata?.properties?.title)}>
          {title}
        </h2>
      )}
      {text && (
        <div
          className={`cm-slot__text`}
          {...metaDataProperty(metadata?.properties?.text)}
          dangerouslySetInnerHTML={{ __html: text }}
        />
      )}
    </>
  );
};

export default SlotHeader;
