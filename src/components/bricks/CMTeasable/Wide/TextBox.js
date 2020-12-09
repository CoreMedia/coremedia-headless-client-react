// @flow
import styled from 'styled-components';
import { media, getColors } from '../../../../styles/themes/utils';

const TextBox = styled.div`
  color: ${props => getColors(props.theme.colors, props.color).fg};
  background-color: ${props => getColors(props.theme.colors, props.color).bgsolid};
  text-align: center;
  ${props => media(props.theme.breakpoints.tablet)`
    position: absolute;
    width: 50%;
    height: 100%;
    left: 50%;
    top: 0%;
  `};
`;

TextBox.displayName = 'TextBox';

TextBox.defaultProps = {
  theme: {
    breakpoints: {
      tablet: 768,
    },
    colors: {
      default: {
        fg: '#fafafa',
        bgsolid: 'rgba(239, 223, 15, 1)',
        bgtrans: 'rgba(239, 223, 15, 0.7)',
        huerotation: '5deg',
      },
    },
  },
};

export default TextBox;
