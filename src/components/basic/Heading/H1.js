// @flow
import H from './H';
import { media } from '../../../styles/themes/utils';

const H1 = H.extend`
  font-size: 1.4em;
  ${props => media(props.theme.breakpoints.tablet)`font-size: 1.7em;`};
  ${props => media(props.theme.breakpoints.desktop)`font-size: 2em;`};
  ${props => media(props.theme.breakpoints.large)`font-size: 2.4em;`};
`;

H1.displayName = 'H1';

H1.defaultProps = {
  theme: {
    breakpoints: {
      tablet: 768,
      desktop: 992,
      large: 1280,
    },
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

export default H1;
