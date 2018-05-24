// @flow
// import PropTypes from 'prop-types';
import styled from 'styled-components';

import { media } from '../../../../styles/themes/utils';

const ProductBox = styled.div`
  display: inline-flex;
  flex: 0 0 auto;
  position: relative;
  width: 144px;
  height: 173px;
  margin: 8px;
  padding: 0 36px;
  order: ${props => props.index};
  ${props => media(props.theme.breakpoints.tablet)`
    display: none;
  `};
`;

ProductBox.displayName = 'ProductBox';

/*ProductBox.propTypes = {
  theme: PropTypes.shape({
    breakpoints: PropTypes.shape({
      tablet: PropTypes.number.isRequired,
    }).isRequired,
  }),
};*/

ProductBox.defaultProps = {
  theme: {
    breakpoints: {
      tablet: 768,
      desktop: 992,
      large: 1280,
    },
  },
};

export default ProductBox;
