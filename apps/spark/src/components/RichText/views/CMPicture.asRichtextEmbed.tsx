import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import RichtextEmbeddedResponsiveImage from "../RichtextEmbeddedResponsiveImage";
import { Picture as GraphQLPicture } from "../../../queries/fragments/__generated__/Picture";
import { initializePicture, Picture } from "../../../models/Banner/Picture";

const CMPictureAsRichtextEmbed: React.FC<IncludeProps<GraphQLPicture>> = ({ self }) => {
  const picture: Picture = initializePicture(self);
  return (
    <div className={"cm-richtext-embedded cm-richtext-embedded--image"}>
      <RichtextEmbeddedResponsiveImage picture={picture} />
    </div>
  );
};

export default CMPictureAsRichtextEmbed;
