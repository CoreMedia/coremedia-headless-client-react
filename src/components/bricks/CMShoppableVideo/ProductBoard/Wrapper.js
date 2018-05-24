// @flow
// import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import theme from 'styled-theming';

import { media } from '../../../../styles/themes/utils';

const borderColor = theme('name', {
  default: 'rgba(0, 108, 174, 1)',
  hkm: '#fabfc0',
});

const fadeIn = keyframes`
  from {
    opacity 0;
  }

  to {
    opacity 1;
  }
`;

const ProductBoardWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  overflow-x: scroll;
  overflow-y: hidden;
  direction: rtl;
  border-width: 3px 0;
  border-style: solid none;
  border-color: ${borderColor};
  padding: 7px;
  animation: ${fadeIn} 0.6s linear;
  ${props => media(props.theme.breakpoints.tablet)`
    display: initial;
    overflow-x: hidden;
    overflow-y: scroll;
    direction: ltr;
  `};
`;

ProductBoardWrapper.displayName = 'ProductBoardWrapper';

/*ProductBoardWrapper.propTypes = {
  theme: PropTypes.shape({
    breakpoints: PropTypes.shape({
      tablet: PropTypes.number.isRequired,
    }).isRequired,
    name: PropTypes.string.isRequired,
  }),
};*/

ProductBoardWrapper.defaultProps = {
  theme: {
    breakpoints: {
      tablet: 768,
    },
    name: 'default',
  },
};

export default ProductBoardWrapper;
