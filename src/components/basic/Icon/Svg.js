// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import uuidv4 from 'uuid/v4';

const StyledSvg = styled.svg.attrs({
  viewBox: props => props.viewBox,
  role: 'img',
})`
  display: inline-block;
  vertical-align: middle;
  width: ${props => (props.size ? `${props.size}px` : '100%')};
  height: ${props => (props.size ? `${props.size}px` : '100%')};
`;

StyledSvg.displayName = 'StyledSvg';

type Props = {
  title: string,
  viewBox?: string,
  size?: number,
  children: React.Node,
};

const Svg = ({ title, viewBox = '0 0 512 512', size, children }: Props) => {
  const _id = uuidv4();
  return (
    <StyledSvg viewBox={viewBox} size={size} aria-labelledby={_id}>
      <title id={_id}>{title}</title>
      {children}
    </StyledSvg>
  );
};

Svg.propTypes = {
  title: PropTypes.string.isRequired,
  viewBox: PropTypes.string,
  size: PropTypes.number,
  children: PropTypes.node.isRequired,
};

export default Svg;
