// @flow
import React from 'react';
import PropTypes from 'prop-types';

import Svg from './Svg';

type Props = {
  color?: string,
  size?: number,
};

const RepeatIcon = ({ color = 'currentColor', size }: Props) => (
  <Svg title="repeat" size={size} viewBox="0 0 84 92">
    <g stroke={color} fill="none" fillRule="evenodd">
      <path
        d="M3.477 66.46c10.67 20.066 35.586 27.683 55.652 17.014 20.066-10.67 27.684-35.586 17.014-55.652C65.473 7.756 40.558.138 20.492 10.808a40.992 40.992 0 0 0-13.626 11.66"
        strokeWidth="6"
      />
      <path strokeWidth="5" fill={color} d="M23.648 24.024H6.385V6.762z" />
    </g>
  </Svg>
);

RepeatIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};

export default RepeatIcon;
