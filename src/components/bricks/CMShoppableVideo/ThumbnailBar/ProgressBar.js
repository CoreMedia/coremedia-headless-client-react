// @flow
import React from 'react';
import PropTypes from 'prop-types';

import ProgressBox from './ProgressBox';
import Bar from './Bar';

type Props = {
  posX: number,
  width: number,
};

const ProgressBar = ({ posX, width }: Props) => (
  <ProgressBox>
    <Bar posX={posX} width={width} />
  </ProgressBox>
);

ProgressBar.propTypes = {
  posX: PropTypes.number,
  width: PropTypes.number,
};

ProgressBar.defaultProps = {
  posX: 0,
  width: 0,
};

export default ProgressBar;
