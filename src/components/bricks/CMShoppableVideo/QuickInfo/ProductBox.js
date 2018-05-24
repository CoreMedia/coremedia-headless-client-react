// @flow
import { Box } from '../../../basic/Box';
import { media } from '../../../../styles/themes/utils';

const ProductBox = Box.extend`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  ${props => media(props.theme.breakpoints.tablet)`
    flex-direction: row;
    align-items: start;
  `};
`;

ProductBox.displayName = 'ProductBox';

/*ProductBox.propTypes = {
  theme: PropTypes.shape({
    name: PropTypes.string.isRequired,
    breakpoints: PropTypes.shape({
      tablet: PropTypes.number.isRequired,
    }).isRequired,
  }),
};*/

ProductBox.defaultProps = {
  theme: {
    name: 'default',
    breakpoints: {
      tablet: 768,
    },
  },
};

export default ProductBox;
