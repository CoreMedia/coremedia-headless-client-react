// @flow
import { P } from '../../../basic/Paragraph';

const Text = P.extend`
  margin-top: 1em;
  padding: 0;
`;

Text.displayName = 'Text';

Text.defaultProps = {
  theme: {
    breakpoints: {
      tablet: 768,
      desktop: 992,
      large: 1280,
    },
    name: 'default',
  },
};

export default Text;
