// @flow
import { P } from '../../../basic/Paragraph';

const Wrapper = P.withComponent('div').extend`
  margin-top: 2em;
  padding: 0 2em;
`;
Wrapper.displayName = 'Wrapper';

export default Wrapper;
