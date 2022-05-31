import React, { FC } from "react";
import { ImageProps, Source } from "../../models/Banner/Picture";
import { getImageUrl } from "../../utils/Media/MediaUrls";
import ResponsiveImage from "../Media/ResponsiveImage";

const HeroResponsiveImage: FC<ImageProps> = ({ picture }) => {
  const sources: Array<Source> = [
    {
      media: "(orientation: portrait) and (max-width: 767px)",
      srcset: getImageUrl(picture.uriTemplate, "portrait_ratio1x1", 400),
    },
    {
      media: "(orientation: landscape) and (max-width: 767px)",
      srcset: getImageUrl(picture.uriTemplate, "landscape_ratio8x3", 768),
    },
    {
      media: "(orientation: portrait) and (min-width: 768px)",
      srcset: getImageUrl(picture.uriTemplate, "landscape_ratio16x9", 944),
    },
    {
      media: "(min-width: 768px)",
      srcset: getImageUrl(picture.uriTemplate, "landscape_ratio8x3", 1144),
    },
    {
      media: "(min-width: 1200px)",
      srcset: getImageUrl(picture.uriTemplate, "landscape_ratio8x3", 1792),
    },
  ];

  return <ResponsiveImage picture={picture} sources={sources} />;
};

export default HeroResponsiveImage;
