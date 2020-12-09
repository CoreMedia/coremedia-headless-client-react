// @flow
import { H1 } from '../../../basic/Heading';

const Title = H1.withComponent('h1').extend`
  margin: 1em;
  text-align: center;
  font-weight: 700;
`;

Title.displayName = 'Title';

Title.defaultProps = {
  theme: {
    breakpoints: {
      tablet: 768,
      desktop: 992,
      large: 1280,
    },
    name: 'default',
  },
};

export default Title;
