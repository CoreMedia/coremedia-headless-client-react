// @flow
import type { ComponentType } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

type Props = {
  translateX: number,
};

const ThumbnailsContainer: ComponentType<Props> = styled.div`
  transform: translateX(${props => `${props.translateX}px`});
  transition: transform 0.45s ease-out;
`;

ThumbnailsContainer.displayName = 'ThumbnailsContainer';

ThumbnailsContainer.propTypes = {
  translateX: PropTypes.number.isRequired,
};

export default ThumbnailsContainer;
