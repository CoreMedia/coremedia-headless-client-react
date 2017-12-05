// @flow
import { H1 } from '../../../basic/Heading';

const Title = H1.withComponent('h1').extend`
  margin: 1em;
  text-align: center;
  font-weight: ${props => props.theme.typography.fontWeight.bold};
`;

Title.displayName = 'Title';

Title.defaultProps = {
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
        bold: 700,
      },
    },
  },
};

export default Title;
