// @flow
import { H2 } from '../../../basic/Heading';

const Title = H2.withComponent('h2').extend`
  color: #333;
`;

Title.displayName = 'Title';

export default Title;
