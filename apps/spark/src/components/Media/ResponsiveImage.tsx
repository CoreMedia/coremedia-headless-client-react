import React, { FC } from "react";
import { ResponsiveImageProps } from "../../models/Banner/Picture";
import { metaDataElement } from "../../utils/Preview/MetaData";

const ResponsiveImage: FC<ResponsiveImageProps> = ({ picture, sources }) => {
  let defaultImageUrl = picture?.data?.uri;
  if (sources.length > 0) {
    defaultImageUrl = sources[0].srcset;
  }

  const containsPlaceholders = picture.uriTemplate?.indexOf("{cropName}") !== -1;
  return (
    <picture className={`cm-image-box`} {...metaDataElement(picture.metadata?.root)}>
      {sources &&
        containsPlaceholders &&
        sources.map((source, index) => {
          return source && <source key={index} media={source.media} srcSet={source.srcset} />;
        })}
      <img
        className={containsPlaceholders ? "cm-image cm-image--responsive" : "cm-image cm-image--uncropped"}
        src={defaultImageUrl || ""}
        alt={picture.alt || ""}
        title={picture.title || ""}
        loading="lazy"
      />
    </picture>
  );
};

export default ResponsiveImage;
