// @flow
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import {getImageUrl} from "../../../backend/api";

const Img = styled.img`
  display: block;
  border: 0;
  margin: 0;
  padding: 0;
  width: 100%;
  filter: sepia(100%) saturate(250%) brightness(70%) hue-rotate(${props => props.colors.huerotation});
`;
Img.displayName = 'Img';

type Props = {
  link: string,
  ratio: string,
  title?: string,
  alt?: string,
  colors: any
};

const getImageSources = (link: string, ratio) => {
  const sourceList = [
    <source key="1" media="(min-width: 1280px)" srcSet={getImageUrl(link, ratio, 1280)}/>,
    <source key="2" media="(min-width: 992px)" srcSet={getImageUrl(link, ratio, 992)}/>,
    <source key="3" media="(min-width: 768px)" srcSet={getImageUrl(link, ratio, 768)}/>,
    <source key="4" media="(min-width: 480px)" srcSet={getImageUrl(link, ratio, 480)}/>
  ];
  return sourceList;
};

const Picture = ({link, ratio, title, alt, colors}: Props) => {
  return (
    <picture>
      {getImageSources(link, ratio)}
      <Img src={getImageUrl(link, ratio, 320)}
           alt={alt}
           title={title}
           colors={colors}
      />
    </picture>
  );
};

Picture.propTypes = {
  link: PropTypes.string.isRequired,
  ratio: PropTypes.string.isRequired,
  title: PropTypes.string,
  alt: PropTypes.string,
  colors: PropTypes.any.isRequired
};

export default Picture;
