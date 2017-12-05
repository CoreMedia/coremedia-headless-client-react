// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';

import Img from './Img';
import { getImageUrl } from '../../../backend';
import type { Theme } from '../../../types';

const convertToArray = (breakpoints: mixed): Array<number> =>
  Object.values(breakpoints).reduce(
    (acc, breakpoint) => (typeof breakpoint === 'number' ? acc.concat(breakpoint) : acc),
    []
  );

const getImageSources = (link: string, ratio: string, breakpoints: mixed): React.Node => {
  if (!(breakpoints instanceof Object)) {
    return;
  }

  const sourceList = convertToArray(breakpoints)
    .sort((a, b) => b - a) // large to small
    .map((breakpoint, index) => (
      <source
        key={index}
        media={`(min-width: ${breakpoint}px)`}
        srcSet={getImageUrl(link, ratio, breakpoint)}
      />
    ));
  return sourceList;
};

type Props = {
  link: string,
  ratio: string,
  title?: string,
  alt?: string,
  color?: string,
  theme: Theme,
};

const Picture = ({ link, ratio, title, alt, color, theme }: Props) => (
  <picture>
    {getImageSources(link, ratio, theme.breakpoints)}
    <Img src={getImageUrl(link, ratio, 320)} alt={alt} title={title} color={color} />
  </picture>
);

Picture.propTypes = {
  link: PropTypes.string.isRequired,
  ratio: PropTypes.string.isRequired,
  title: PropTypes.string,
  alt: PropTypes.string,
  color: PropTypes.string,
  theme: PropTypes.shape({
    breakpoints: PropTypes.object.isRequired,
  }),
};

Picture.defaultProps = {
  theme: {
    breakpoints: {
      small: 480,
      tablet: 768,
      desktop: 992,
      large: 1280,
    },
  },
};

export default withTheme(Picture);
