import React, { FC } from "react";
import styled, { css } from "styled-components";
import { getImageUrlByPicture } from "../../utils/Media/MediaUrls";
import { ImageProps } from "../../models/Banner/Picture";
import { metaDataProperty } from "../../utils/Preview/MetaData";

export const StyledImage = styled.img<{ uncropped?: boolean }>`
  display: block;
  width: 100%;
  color: transparent;
  ${(props) =>
    props.uncropped && props.uncropped === true
      ? css`
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          object-fit: cover;
          object-position: center center;
        `
      : ""}
`;
const Image: FC<ImageProps> = ({ picture, cropName, width }) => {
  const imageUrl = getImageUrlByPicture(picture, cropName, width);

  return (
    <StyledImage
      src={imageUrl}
      alt={picture.alt || ""}
      title={picture.title || ""}
      loading="lazy"
      {...metaDataProperty("properties.data." + cropName)}
    />
  );
};

export default Image;
