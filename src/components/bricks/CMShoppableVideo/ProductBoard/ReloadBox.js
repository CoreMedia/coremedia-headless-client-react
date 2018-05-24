// @flow
// import PropTypes from 'prop-types';
import styled from 'styled-components';

import { media } from '../../../../styles/themes/utils';

const ReloadBox = styled.div`
  display: none;
  ${props => media(props.theme.breakpoints.tablet)`
    display: block;
    position: absolute;
    bottom: 3px;
    left: 0;
    z-index: 9999;
  `};
`;

ReloadBox.displayName = 'ReloadBox';

/*ReloadBox.propTypes = {
  theme: PropTypes.shape({
    breakpoints: PropTypes.shape({
      tablet: PropTypes.number.isRequired,
    }).isRequired,
  }),
};*/

ReloadBox.defaultProps = {
  theme: {
    breakpoints: {
      tablet: 768,
    },
  },
};

export default ReloadBox;
