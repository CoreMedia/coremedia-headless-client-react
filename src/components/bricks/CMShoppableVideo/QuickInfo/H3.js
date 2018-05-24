// @flow
import { P } from '../../../basic/Paragraph';

const H3 = P.withComponent('h3').extend`
  margin: 20px 10px 10px 2px;
  align-self: start;
`;

H3.displayName = 'H3';

export default H3;
