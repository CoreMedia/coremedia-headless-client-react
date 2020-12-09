// @flow
import { H2 } from '../../../basic/Heading';

const Headline = H2.extend`
  padding: 0;
`;

Headline.displayName = 'Headline';

Headline.defaultProps = {
  theme: {
    breakpoints: {
      tablet: 768,
      desktop: 992,
      large: 1280,
    },
    name: 'default',
  },
};

export default Headline;
