// @flow
import type { ComponentType } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

type Props = {
  active: boolean,
  ariaLabel?: string,
};

const LinkButton: ComponentType<Props> = styled.a.attrs({
  role: 'button',
  'aria-label': props => props.ariaLabel,
})`
  display: inline-block;
  opacity: ${props => (props.active ? 1 : 0.4)};
  transition: opacity 0.3s linear 0.3s;
`;
LinkButton.displayName = 'LinkButton';

LinkButton.propTypes = {
  active: PropTypes.bool.isRequired,
  ariaLabel: PropTypes.string,
};

export default LinkButton;
