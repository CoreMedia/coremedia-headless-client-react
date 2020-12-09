// @flow
import styled from 'styled-components';
import { media } from '../../../../styles/themes/utils';

const PictureBox = styled.div`
  width: 100%;
  ${props => media(props.theme.breakpoints.tablet)`width: 50%;`};
`;

PictureBox.displayName = 'PictureBox';

PictureBox.defaultProps = {
  theme: {
    breakpoints: {
      tablet: 768,
    },
  },
};

export default PictureBox;
