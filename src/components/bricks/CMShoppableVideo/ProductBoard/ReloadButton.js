// @flow
import React from 'react';
import PropTypes from 'prop-types';

import { IconButton as BasicIconButton } from '../../../basic/Button';
import RepeatIcon from '../../../basic/Icon/RepeatIcon';
import { media } from '../../../../styles/themes/utils';

const IconButton = BasicIconButton.extend`
  width: 100%;
  height: auto;
  ${props => media(props.theme.breakpoints.tablet)`
    width: 40px;
    height: 40px;
  `};
`;

IconButton.displayName = 'IconButton';

IconButton.propTypes = {
  theme: PropTypes.shape({
    breakpoints: PropTypes.shape({
      tablet: PropTypes.number.isRequired,
    }).isRequired,
  }),
};

IconButton.defaultProps = {
  theme: {
    breakpoints: {
      tablet: 768,
    },
  },
};

type Props = {
  id?: string,
  handleClick: (ev: SyntheticEvent<HTMLButtonElement>) => void,
};

const ReloadButton = ({ id, handleClick }: Props) => (
  <IconButton onClick={handleClick} color="#808080" backgroundColor="rgba(255, 255, 255, 0.5)">
    <RepeatIcon id={id} />
  </IconButton>
);

ReloadButton.propTypes = {
  id: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
};

export default ReloadButton;
