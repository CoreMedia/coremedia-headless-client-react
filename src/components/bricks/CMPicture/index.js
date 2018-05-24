// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';

import Img from '../../basic/Img';
import { getMediaUrl } from '../../../backend';
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
        srcSet={getMediaUrl(link, ratio, breakpoint)}
      />
    ));
  return sourceList;
};

type Props = {
  link: string,
  ratio: string,
  stretch?: boolean,
  title?: string,
  alt?: string,
  theme: Theme,
};

const Picture = ({ link, ratio, stretch, title, alt, theme }: Props) =>
  ratio === 'thumbnail' ? (
    <Img src={getMediaUrl(link, ratio, 77)} alt={alt} title={title} stretch={stretch} />
  ) : (
    <picture>
      {getImageSources(link, ratio, theme.breakpoints)}
      <Img src={getMediaUrl(link, ratio, 320)} alt={alt} title={title} stretch={stretch} />
    </picture>
  );

const Wrapped = withTheme(Picture);

Wrapped.propTypes = {
  link: PropTypes.string.isRequired,
  ratio: PropTypes.string.isRequired,
  stretch: PropTypes.bool,
  title: PropTypes.string,
  alt: PropTypes.string,
  color: PropTypes.string,
};

Wrapped.defaultProps = {
  theme: {
    breakpoints: {
      small: 480,
      tablet: 768,
      desktop: 992,
      large: 1280,
    },
  },
};

export default Wrapped;
