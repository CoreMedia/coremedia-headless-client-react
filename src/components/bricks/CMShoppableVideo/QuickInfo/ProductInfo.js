// @flow
// import PropTypes from 'prop-types';

import { Box } from '../../../basic/Box';
import { media } from '../../../../styles/themes/utils';

const ProductInfo = Box.extend`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0 0 0;
  ${props => media(props.theme.breakpoints.tablet)`
    align-items: start;
    padding: 10px 0 0 30px;
  `};
`;

ProductInfo.displayName = 'ProductInfo';

/*ProductInfo.propTypes = {
  theme: PropTypes.shape({
    name: PropTypes.string.isRequired,
    breakpoints: PropTypes.shape({
      tablet: PropTypes.number.isRequired,
    }).isRequired,
  }),
};*/

ProductInfo.defaultProps = {
  theme: {
    name: 'default',
    breakpoints: {
      tablet: 768,
    },
  },
};

export default ProductInfo;
