import React, { FC } from "react";
import { ResponsiveImageProps } from "../../models/Banner/Picture";
import { metaDataElement } from "../../utils/Preview/MetaData";

const ResponsiveImage: FC<ResponsiveImageProps> = ({ picture, sources }) => {
  let defaultImageUrl = picture?.data?.uri;
  if (sources.length > 0) {
    defaultImageUrl = sources[0].srcset;
  }

  return (
    <picture className={`cm-image-box`} {...metaDataElement(picture.metadata?.root)}>
      {sources &&
        sources.map((source, index) => {
          return source && <source key={index} media={source.media} srcSet={source.srcset} />;
        })}
      <img
        className="cm-image cm-image--responsive"
        src={defaultImageUrl || ""}
        alt={picture.alt || ""}
        title={picture.title || ""}
        loading="lazy"
      />
    </picture>
  );
};

export default ResponsiveImage;
