import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import RichtextEmbeddedResponsiveImage from "../RichtextEmbeddedResponsiveImage";
import { Picture } from "../../../queries/fragments/__generated__/Picture";

const CMPictureAsRichtextEmbed: React.FC<IncludeProps<Picture>> = ({ self }) => {
  return (
    <div className={"cm-richtext-embedded cm-richtext-embedded--image"}>
      <RichtextEmbeddedResponsiveImage picture={self} />
    </div>
  );
};

export default CMPictureAsRichtextEmbed;
