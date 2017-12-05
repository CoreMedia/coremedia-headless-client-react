// @flow
import H from './H';
import { media } from '../../../styles/themes/utils';

const H3 = H.extend`
  font-size: 1.2em;
  ${props => media(props.theme.breakpoints.tablet)`font-size: 1.3em;`};
  ${props => media(props.theme.breakpoints.desktop)`font-size: 1.4em;`};
  ${props => media(props.theme.breakpoints.large)`font-size: 1.6em;`};
`;

H3.displayName = 'H3';

H3.defaultProps = {
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

export default H3;
