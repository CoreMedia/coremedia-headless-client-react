import React, { FC } from "react";
import styled from "styled-components";
import { ResponsiveImageProps } from "../../models/Banner/Picture";
import { metaDataElement } from "../../utils/Preview/MetaData";
import { StyledImage } from "./Image";

export const ImageBox = styled.picture`
  --aspect-ratio: 4 * 3; // width*height, default
  position: relative;
  display: block;
  height: 0;
  width: 100%;
  overflow: hidden;
  background-color: var(--color-background-image);
  padding-bottom: calc(100% / var(--aspect-ratio));
`;

const ResponsiveImage: FC<ResponsiveImageProps> = ({ picture, sources }) => {
  let defaultImageUrl = picture?.data?.uri;
  if (sources.length > 0) {
    defaultImageUrl = sources[0].srcset;
  }

  const containsPlaceholders = picture.uriTemplate?.indexOf("{cropName}") !== -1;
  return (
    <ImageBox {...metaDataElement(picture.metadata?.root)}>
      {sources &&
        containsPlaceholders &&
        sources.map((source, index) => {
          return source && <source key={index} media={source.media} srcSet={source.srcset} />;
        })}
      <StyledImage
        uncropped={containsPlaceholders}
        src={defaultImageUrl || ""}
        alt={picture.alt || ""}
        title={picture.title || ""}
        loading="lazy"
      />
    </ImageBox>
  );
};

export default ResponsiveImage;
