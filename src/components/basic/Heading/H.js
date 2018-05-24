// @flow
import { css } from 'styled-components';
import theme from 'styled-theming';

import { Box } from '../Box';

const headingStyles = theme('name', {
  default: css`
    font-family: 'Core Light', 'Simplon Norm Regular', 'Lucida Sans', 'Lucida Sans Unicode',
      'Lucida Grande', Arial, Helvetica, sans-serif;
    font-weight: 400;
  `,
  hkm: css`
    font-family: Helvetica, Arial, sans-serif;
    font-weight: 300;
  `,
});

const H = Box.extend`
  ${headingStyles};
  line-height: 1.2;
  margin: 0;
`;

H.displayName = 'H';

H.defaultProps = {
  theme: {
    name: 'default',
  },
};

export default H;
