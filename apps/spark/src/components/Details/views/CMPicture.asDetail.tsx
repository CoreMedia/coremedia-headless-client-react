import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { Picture as GraphQLPicture } from "@coremedia-labs/graphql-layer";
import Image from "../../Media/Image";
import { initializePicture, Picture } from "../../../models/Banner/Picture";
import { metaDataElement } from "../../../utils/Preview/MetaData";

const CMPictureAsDetail: React.FC<IncludeProps<GraphQLPicture>> = ({ self }) => {
  const picture: Picture = initializePicture(self);
  return (
    <div className={`cm-image-box cm-details__picture`} {...metaDataElement(picture.metadata?.root)}>
      <Image picture={picture} cropName={"landscape_ratio8x3"} width={1144} />
    </div>
  );
};
export default CMPictureAsDetail;
