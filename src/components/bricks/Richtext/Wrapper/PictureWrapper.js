// @flow
import styled from 'styled-components';

import { media } from '../../../../styles/themes/utils';

const PictureWrapper = styled.span`
  margin: 1em 0em;
  display: block;
  ${props => media(props.theme.breakpoints.tablet)`
    margin: 1em 1em 1em 0em;
    width: 50%;
    float: left;
  `};
`;

PictureWrapper.displayName = 'PictureWrapper';

/*PictureWrapper.propTypes = {
  theme: PropTypes.shape({
    breakpoints: PropTypes.shape({
      tablet: PropTypes.number.isRequired,
    }).isRequired,
    name: PropTypes.string.isRequired
  }),
};*/

PictureWrapper.defaultProps = {
  theme: {
    name: 'default',
    breakpoints: {
      tablet: 768,
    },
  },
};

export default PictureWrapper;
