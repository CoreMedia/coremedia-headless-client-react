// @flow
import H from './H';
import { media } from '../../../styles/themes/utils';

const H2 = H.extend`
  font-size: 1.3em;
  ${props => media(props.theme.breakpoints.tablet)`font-size: 1.5em;`};
  ${props => media(props.theme.breakpoints.desktop)`font-size: 1.7em;`};
  ${props => media(props.theme.breakpoints.large)`font-size: 2em;`};
`;

H2.displayName = 'H2';

H2.defaultProps = {
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

export default H2;
