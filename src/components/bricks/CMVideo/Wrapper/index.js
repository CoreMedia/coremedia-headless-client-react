// @flow
import type { ComponentType } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

type Props = {
  width?: number,
  height?: number,
};

const Wrapper: ComponentType<Props> = styled.div`
  margin: 0;
  padding: 0;
  cursor: pointer;
  width: ${props => (props.width ? `${props.width}px` : '100%')};
  height: ${props => (props.height ? `${props.height}px` : '100%')};
`;
Wrapper.displayName = 'Wrapper';

Wrapper.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};

export default Wrapper;
