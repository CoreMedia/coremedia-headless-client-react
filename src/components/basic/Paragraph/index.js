// @flow
import styled from 'styled-components';
import { media } from '../../../styles/themes/utils';

const P = styled.p`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: ${props => props.theme.typography.fontFamily.text};
  line-height: 1.4;
  font-size: 1em;
  font-weight: 400;
  ${props => media(props.theme.breakpoints.tablet)`font-size: 1em;`};
  ${props => media(props.theme.breakpoints.desktop)`font-size: 1.1em;`};
  ${props => media(props.theme.breakpoints.large)`font-size: 1.2em;`};
`;

P.displayName = 'P';

P.defaultProps = {
  theme: {
    breakpoints: {
      tablet: 768,
      desktop: 992,
      large: 1280,
    },
    typography: {
      fontFamily: {
        text: 'Helvetica',
      },
    },
  },
};

export { P };
