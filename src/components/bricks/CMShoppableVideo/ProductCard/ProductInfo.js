// @flow
import { Box } from '../../../basic/Box';

const ProductInfo = Box.extend`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 5px;
`;

ProductInfo.displayName = 'ProductInfo';

export default ProductInfo;
