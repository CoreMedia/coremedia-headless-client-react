// @flow
// import PropTypes from 'prop-types';
import styled from 'styled-components';

import { media } from '../../../../styles/themes/utils';

const getEncodedPlayIcon = () => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <circle
      cx="256"
      cy="256"
      r="231"
      fill="rgba(0,0,0,.5)"
      stroke="#fff"
      stroke-width="30"
      stroke-miterlimit="10"
    />
    <path
      d="M348.1 245.6l-134-78.2c-12.2-7.1-22.1-1.4-22 12.7l.7 155.2c.1 14.1 10 19.9 22.3 12.8l133-76.8c12.2-7.1 12.3-18.6 0-25.7z"
      fill="#fff"
    />
  </svg>`;
  return window.btoa(svg);
};

const PlayIcon = styled.div`
  position: absolute;
  bottom: 50%;
  right: 50%;
  transform: translate(50%, 50%);
  z-index: 1;
  width: 90px;
  height: 90px;
  max-width: 75%;
  max-height: 75%;
  background: transparent url(data:image/svg+xml;base64,${getEncodedPlayIcon()}) no-repeat;
  transition: all 0.35s ease(in-out-quad);
  ${props => media(props.theme.breakpoints.desktop)`
		width: 120px;
		height: 120px;
	`};
`;

PlayIcon.displayName = 'PlayIcon';

/*PlayIcon.propTypes = {
  theme: PropTypes.shape({
    breakpoints: PropTypes.shape({
      desktop: PropTypes.number.isRequired,
    }).isRequired,
  }),
};*/

PlayIcon.defaultProps = {
  theme: {
    breakpoints: {
      desktop: 992,
    },
  },
};

export default PlayIcon;
