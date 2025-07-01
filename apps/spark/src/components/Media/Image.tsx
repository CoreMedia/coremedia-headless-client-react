import React, { FC, useState } from "react";
import styled, { css } from "styled-components";
import { getImageUrlByPicture } from "../../utils/Media/MediaUrls";
import { ImageProps } from "../../models/Banner/Picture";
import { metaDataProperty } from "../../utils/Preview/MetaData";
import loader from "./assets/loader.svg";

export const StyledImage = styled.img<{ uncropped?: boolean; loaded?: boolean }>`
  display: block;
  width: 100%;
  color: transparent;
  background: var(--color-background-image);

  ${(props) =>
    props.uncropped &&
    props.uncropped === true &&
    css`
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      object-fit: cover;
      object-position: center center;
    `}

  ${(props) =>
    props.loaded === false &&
    css`
      background: var(--color-background-image) url("${loader}") center/10% no-repeat;
    `}
`;
const Image: FC<ImageProps> = ({ picture, cropName, width, aspectRatio = "auto" }) => {
  const imageUrl = getImageUrlByPicture(picture, cropName, width);
  const [loaded, setLoaded] = useState(false);

  return (
    <StyledImage
      src={imageUrl}
      width={width}
      style={{ aspectRatio: aspectRatio }}
      alt={picture.alt || ""}
      title={picture.title || ""}
      loading="lazy"
      onLoad={() => setLoaded(true)}
      loaded={loaded}
      {...metaDataProperty("properties.data." + cropName)}
    />
  );
};

export default Image;
