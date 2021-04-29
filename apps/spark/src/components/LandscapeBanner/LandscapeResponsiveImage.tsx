import React, { FC } from "react";
import { ImageProps, Source } from "../../models/Banner/Picture";
import { getImageUrl } from "../../utils/Media/MediaUrls";
import ResponsiveImage from "../Media/ResponsiveImage";

const LandscapeResponsiveImage: FC<ImageProps> = ({ picture }) => {
  const sources: Array<Source> = [
    {
      media: "(max-width: 767px)",
      srcset: getImageUrl(picture.uriTemplate, "landscape_ratio16x9", 400),
    },
    {
      media: "(min-width: 768px)",
      srcset: getImageUrl(picture.uriTemplate, "landscape_ratio16x9", 944),
    },
  ];

  return <ResponsiveImage picture={picture} sources={sources} />;
};

export default LandscapeResponsiveImage;
