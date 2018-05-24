// @flow
import React from 'react';
import PropTypes from 'prop-types';

import PlayIcon from './PlayIcon';

type Props = {
  handleClick: () => void,
};

const PlayButton = ({ handleClick }: Props) => <PlayIcon onClick={handleClick} />;

PlayButton.propTypes = {
  handleClick: PropTypes.func,
};

export default PlayButton;
