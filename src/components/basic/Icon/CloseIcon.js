// @flow
import React from 'react';
import PropTypes from 'prop-types';

import Svg from './Svg';

type Props = {
  color?: string,
  size?: number,
};

const CloseIcon = ({ color = 'currentColor', size }: Props) => {
  return (
    <Svg title="close" size={size}>
      <path
        fill={color}
        d="M256 0C114.624 0 0 114.624 0 256s114.624 256 256 256 256-114.624 256-256S397.376 0 256 0zm126.624 337.376l-45.248 45.248L256 301.248l-81.376 81.376-45.248-45.248L210.752 256l-81.376-81.376 45.248-45.248L256 210.752l81.376-81.376 45.248 45.248L301.248 256l81.376 81.376z"
      />
    </Svg>
  );
};

CloseIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};

export default CloseIcon;
