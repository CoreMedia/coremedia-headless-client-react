// @flow
import type { ComponentType } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

type Props = {
  ariaLabel?: string,
};

const LinkButton: ComponentType<Props> = styled.a.attrs({
  role: 'button',
  'aria-label': props => props.ariaLabel,
})`
  display: inline-block;
  width: 100%;
`;
LinkButton.displayName = 'LinkButton';

LinkButton.propTypes = {
  ariaLabel: PropTypes.string,
};

export default LinkButton;
