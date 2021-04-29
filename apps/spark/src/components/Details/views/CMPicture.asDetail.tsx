import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { Picture } from "../../../queries/fragments/__generated__/Picture";
import Image from "../../Media/Image";

const CMPictureAsDetail: React.FC<IncludeProps<Picture>> = ({ self }) => {
  return (
    <div className={`cm-image-box cm-details__picture`}>
      <Image picture={self} cropName={"landscape_ratio8x3"} width={1144} />
    </div>
  );
};
export default CMPictureAsDetail;
