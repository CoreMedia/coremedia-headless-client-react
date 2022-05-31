import React, { FC } from "react";
import { ImageProps, Source } from "../../models/Banner/Picture";
import { getImageUrl } from "../../utils/Media/MediaUrls";
import ResponsiveImage from "../Media/ResponsiveImage";

const SquareResponsiveImage: FC<ImageProps> = ({ picture }) => {
  const sources: Array<Source> = [
    {
      media: "(max-width: 767px)",
      srcset: getImageUrl(picture.uriTemplate, "portrait_ratio1x1", 400),
    },
    {
      media: "(min-width: 768px)",
      srcset: getImageUrl(picture.uriTemplate, "portrait_ratio1x1", 768),
    },
  ];

  return <ResponsiveImage picture={picture} sources={sources} />;
};

export default SquareResponsiveImage;
