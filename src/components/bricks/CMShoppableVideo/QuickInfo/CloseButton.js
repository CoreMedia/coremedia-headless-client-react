// @flow
import React from 'react';
import PropTypes from 'prop-types';

import { IconButton as BasicIconButton } from '../../../basic/Button';
import CloseIcon from '../../../basic/Icon/CloseIcon';

const IconButton = BasicIconButton.extend`
  position: absolute;
  top: 5px;
  right: 5px;
`;

IconButton.displayName = 'IconButton';

type Props = {
  handleClick: (ev: SyntheticEvent<HTMLButtonElement>) => void,
};

const CloseButton = ({ handleClick }: Props) => (
  <IconButton onClick={handleClick} color="#808080">
    <CloseIcon />
  </IconButton>
);

CloseButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default CloseButton;
