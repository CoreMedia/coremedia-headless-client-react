// @flow
import { Button as BasicButton, LinkButton as BasicLinkButton } from '../../basic/Button/';

const Button = BasicButton.extend`
  margin-top: 1em;
`;

const LinkButton = BasicLinkButton.extend`
  margin-top: 1em;
`;

export { Button, LinkButton };
