// @flow
// import PropTypes from 'prop-types';
import styled from 'styled-components';

import { media } from '../../../../styles/themes/utils';

const Container = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  height: 100%;
  transition: transform 0.45s ease-out;
  ${props => media(props.theme.breakpoints.tablet)`
    flex-wrap: wrap;
    flex-direction: row;
    transform: unset;
    justify-content: center;
    align-content: ${props.productboardOverflow ? 'flex-start' : 'center'};
  `};
`;

Container.displayName = 'Container';

/*Container.propTypes = {
  theme: PropTypes.shape({
    breakpoints: PropTypes.shape({
      tablet: PropTypes.number.isRequired,
    }).isRequired,
  }),
};*/

Container.defaultProps = {
  theme: {
    breakpoints: {
      tablet: 768,
    },
  },
};

export default Container;
