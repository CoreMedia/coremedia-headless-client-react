// @flow
import { css } from 'styled-components';
import theme from 'styled-theming';

import H from './H';
import { media } from '../../../styles/themes/utils';

const headingStyles = theme('name', {
  default: css`
    text-transform: uppercase;
    font-size: 1.3em;
    ${props =>
      media(props.theme.breakpoints.tablet)`
        font-size: 1.5em;
      `};
    ${props =>
      media(props.theme.breakpoints.desktop)`
        font-size: 1.7em;
      `};
    ${props =>
      media(props.theme.breakpoints.large)`
        font-size: 2em;
      `};
  `,
  hkm: css`
    text-transform: none;
    font-size: 1.3em;
    ${props =>
      media(props.theme.breakpoints.tablet)`
        font-size: 1.5em;
      `};
    ${props =>
      media(props.theme.breakpoints.desktop)`
        font-size: 1.65em;
      `};
    ${props =>
      media(props.theme.breakpoints.large)`
        font-size: 2em;
      `};
  `,
});

const H2 = H.extend`
  ${headingStyles};
`;

H2.displayName = 'H2';

H2.defaultProps = {
  theme: {
    breakpoints: {
      tablet: 768,
      desktop: 992,
      large: 1280,
    },
    name: 'default',
  },
};

export default H2;
