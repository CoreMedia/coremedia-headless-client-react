// @flow
// import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import theme from 'styled-theming';

import { media } from '../../../../styles/themes/utils';

const sizeStyles = {
  tablet: theme('name', {
    default: css`
      width: 134px;
      height: 258px;
    `,
    hkm: css`
      width: 134px;
      height: 244px;
    `,
  }),
  desktop: theme('name', {
    default: css`
      width: 179px;
      height: 319px;
    `,
    hkm: css`
      width: 179px;
      height: 281px;
    `,
  }),
  large: theme('name', {
    default: css`
      width: 237px;
      height: 368px;
    `,
    hkm: css`
      width: 237px;
      height: 350px;
    `,
  }),
};

const ProductBox = styled.div`
  flex: 0 0 auto;
  position: relative;
  top: -20px;
  width: 144px;
  height: 256px;
  margin: 8px;
  z-index: 5;
  text-align: center;
  order: ${props => props.index};
  opacity: 0;
  transition: opacity 0.2s ease-out, top 0.6s ease-out;
  ${props =>
    props.entered &&
    css`
      top: 0;
      opacity: 1;
    `};
  ${props => media(props.theme.breakpoints.tablet)`
    border: 1px solid #eee;
    &:hover {
      z-index: 10;
    }
  `};
  ${props =>
    ['tablet', 'desktop', 'large'].reduce(
      (acc, breakpoint) =>
        acc.concat(
          media(props.theme.breakpoints[breakpoint])`
            ${sizeStyles[breakpoint]}
          `
        ),
      []
    )};
`;

ProductBox.displayName = 'ProductBox';

/*ProductBox.propTypes = {
  index: PropTypes.number.isRequired,
  entered: PropTypes.bool,
  theme: PropTypes.shape({
    name: PropTypes.string.isRequired,
    breakpoints: PropTypes.shape({
      tablet: PropTypes.number.isRequired,
      desktop: PropTypes.number.isRequired,
      large: PropTypes.number.isRequired,
    }).isRequired,
  }),
};*/

ProductBox.defaultProps = {
  theme: {
    name: 'default',
    breakpoints: {
      tablet: 768,
      desktop: 992,
      large: 1280,
    },
  },
};

export default ProductBox;
