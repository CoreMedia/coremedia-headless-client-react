// @flow
import type { ComponentType } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

type Props = {
  color?: string,
  backgroundColor?: string,
};

const IconButton: ComponentType<Props> = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 7px;
  margin: 0;
  border-style: none;
  border-radius: 50%;
  border-width: 0;
  outline: none;
  color: ${props => props.color || 'inherit'};
  background-color: ${props => props.backgroundColor || 'transparent'};
  cursor: pointer;
`;

IconButton.displayName = 'IconButton';

IconButton.propTypes = {
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
};

export default IconButton;
