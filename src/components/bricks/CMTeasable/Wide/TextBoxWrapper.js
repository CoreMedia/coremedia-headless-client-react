// @flow
import styled from 'styled-components';
import { media } from '../../../../styles/themes/utils';

const TextBoxWrapper = styled.div`
  padding: 2rem;
  ${props => media(props.theme.breakpoints.tablet)`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  `};
`;

TextBoxWrapper.displayName = 'TextBoxWrapper';

TextBoxWrapper.defaultProps = {
  theme: {
    breakpoints: {
      tablet: 768,
    },
  },
};

export default TextBoxWrapper;
