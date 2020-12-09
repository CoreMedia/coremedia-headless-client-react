// @flow
import styled, { css } from 'styled-components';
import theme from 'styled-theming';

import { media } from '../../../styles/themes/utils';

const paraStyles = theme('name', {
  default: css`
    font-family: 'Simplon Norm Light', 'Lucida Sans', 'Lucida Sans Unicode', 'Lucida Grande', Arial,
      Helvetica, sans-serif;
    font-weight: 400;
    line-height: 1.4;
    font-size: 1em;
    ${props =>
      media(props.theme.breakpoints.tablet)`
        font-size: 1em;
      `};
    ${props =>
      media(props.theme.breakpoints.desktop)`
        font-size: 1.1em;
      `};
    ${props =>
      media(props.theme.breakpoints.large)`
        font-size: 1.2em;
      `};
  `,
  hkm: css`
    font-family: Helvetica, Arial, sans-serif;
    font-weight: 300;
    font-size: 0.8em;
    line-height: 1.4;
  `,
});

const P = styled.p`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  ${paraStyles};
`;

P.displayName = 'P';

P.defaultProps = {
  theme: {
    breakpoints: {
      tablet: 768,
      desktop: 992,
      large: 1280,
    },
    name: 'default',
  },
};

export { P };
