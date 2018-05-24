// @flow
import { css } from 'styled-components';
import theme from 'styled-theming';

import H from './H';
import { media } from '../../../styles/themes/utils';

const headingStyles = theme('name', {
  default: css`
    text-transform: uppercase;
    font-size: 1.4em;
    ${props =>
      media(props.theme.breakpoints.tablet)`
        font-size: 1.7em;
      `};
    ${props =>
      media(props.theme.breakpoints.desktop)`
        font-size: 2em;
      `};
    ${props =>
      media(props.theme.breakpoints.large)`
        font-size: 2.4em;
      `};
  `,
  hkm: css`
    text-transform: none;
    font-size: 1.4em;
    ${props =>
      media(props.theme.breakpoints.tablet)`
        font-size: 1.7em;
      `};
    ${props =>
      media(props.theme.breakpoints.desktop)`
        font-size: 2em;
      `};
    ${props =>
      media(props.theme.breakpoints.large)`
        font-size: 2.4em;
      `};
  `,
});

const H1 = H.extend`
  ${headingStyles};
`;

H1.displayName = 'H1';

H1.defaultProps = {
  theme: {
    breakpoints: {
      tablet: 768,
      desktop: 992,
      large: 1280,
    },
    name: 'default',
  },
};

export default H1;
