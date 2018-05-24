// @flow
// import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import theme from 'styled-theming';

import ProductBox from './ProductBox';
import { media } from '../../../../styles/themes/utils';

const hoverStyles = {
  tablet: theme('name', {
    default: css`
      left: -2.5%;
      top: -11.5%;
      width: 105%;
      height: 123%;
    `,
    hkm: css`
      left: -2.5%;
      top: -10%;
      width: 105%;
      height: 120%;
    `,
  }),
  desktop: theme('name', {
    default: css`
      left: -2.5%;
      top: -9.5%;
      width: 105%;
      height: 119%;
    `,
    hkm: css`
      left: -2.5%;
      top: -9%;
      width: 105%;
      height: 118%;
    `,
  }),
  large: theme('name', {
    default: css`
      left: -2.5%;
      top: -9%;
      width: 105%;
      height: 118%;
    `,
    hkm: css`
      left: -2.5%;
      top: -7.5%;
      width: 105%;
      height: 115%;
    `,
  }),
};

const ProductZoom = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  overflow: hidden;
  ${props => media(props.theme.breakpoints.tablet)`
    transition: top 0.1s ease-out, left 0.1s ease-out, width 0.1s ease-out, height 0.1s ease-out;
    ${ProductBox}:hover & {
      z-index: 10;
      box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.32);
    }
  `};
  ${props =>
    ['tablet', 'desktop', 'large'].reduce(
      (acc, breakpoint) =>
        acc.concat(
          media(props.theme.breakpoints[breakpoint])`
            ${ProductBox}:hover & {
              ${hoverStyles[breakpoint]}
            }
          `
        ),
      []
    )};
`;

ProductZoom.displayName = 'ProductZoom';

/*ProductZoom.propTypes = {
  theme: PropTypes.shape({
    name: PropTypes.string.isRequired,
    breakpoints: PropTypes.shape({
      tablet: PropTypes.number.isRequired,
    }).isRequired,
  }),
};*/

ProductZoom.defaultProps = {
  theme: {
    name: 'default',
    breakpoints: {
      tablet: 768,
      desktop: 992,
      large: 1280,
    },
  },
};

export default ProductZoom;
