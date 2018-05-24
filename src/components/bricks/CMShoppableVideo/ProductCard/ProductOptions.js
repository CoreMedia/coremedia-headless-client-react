// @flow
// import PropTypes from 'prop-types';
import { Box } from '../../../basic/Box';

import ProductBox from './ProductBox';
import { media } from '../../../../styles/themes/utils';

const ProductOptions = Box.extend`
  display: none;
  ${props => media(props.theme.breakpoints.tablet)`
    ${ProductBox}:hover & {
      display: flex;
      justify-content: center;
      padding: 0px 10px 10px 10px;
    }
  `};
`;

ProductOptions.displayName = 'ProductOptions';

/*ProductOptions.propTypes = {
  theme: PropTypes.shape({
    name: PropTypes.string.isRequired,
    breakpoints: PropTypes.shape({
      tablet: PropTypes.number.isRequired,
    }).isRequired,
  }),
};*/

ProductOptions.defaultProps = {
  theme: {
    name: 'default',
    breakpoints: {
      tablet: 768,
    },
  },
};

export default ProductOptions;
