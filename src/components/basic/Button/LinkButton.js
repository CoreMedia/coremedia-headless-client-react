// @flow
import Button from './Button';

const LinkButton = Button.withComponent('a').extend`
  display: inline-block;
`;
LinkButton.displayName = 'LinkButton';

export default LinkButton;
