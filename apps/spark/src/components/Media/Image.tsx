import React, { FC } from "react";
import { getImageUrlByPicture } from "../../utils/Media/MediaUrls";
import { ImageProps } from "../../models/Banner/Picture";
import { metaData } from "../../utils/Preview/MetaData";

import "./Media.scss";

const Image: FC<ImageProps> = ({ picture, cropName, width }) => {
  const imageUrl = getImageUrlByPicture(picture, cropName, width);

  return (
    <img
      className={`cm-image`}
      src={imageUrl}
      alt={picture.alt || ""}
      title={picture.title || ""}
      loading="lazy"
      {...metaData(picture.metadata?.root, "properties.data", "properties.data." + cropName)}
    />
  );
};

export default Image;
