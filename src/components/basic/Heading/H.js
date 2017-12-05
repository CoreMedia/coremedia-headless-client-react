// @flow
import { Box } from '../Box';

const H = Box.extend`
  font-family: ${props => props.theme.typography.fontFamily.heading};
  font-weight: ${props => props.theme.typography.fontWeight.normal};
  line-height: 1.2;
  margin: 0;
  text-transform: uppercase;
`;

H.displayName = 'H';

H.defaultProps = {
  theme: {
    typography: {
      fontFamily: {
        heading: 'Helvetica',
      },
      fontWeight: {
        normal: 400,
      },
    },
  },
};

export default H;
