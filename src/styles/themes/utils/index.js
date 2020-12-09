// @flow
import { css } from 'styled-components';

import type { Colors, ColorProps } from '../../../types';

const media = (breakpoint: number) => (...args: Array<any>) => css`
  @media (min-width: ${breakpoint / 16}em) {
    ${css(...args)};
  }
`;

const getColors = (colors: Colors, name: string = 'default'): ColorProps => {
  return colors[name] || colors['default'];
};

export { media, getColors };
