// @flow
import { Box } from '../../../basic/Box';

const TextBox = Box.extend`
  text-align: center;
  & :first-child {
    margin-top: 0.6em;
  }
  & :last-child {
    margin-bottom: 0.6em;
  }
`;
TextBox.displayName = 'TextBox';

export default TextBox;
