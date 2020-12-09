// @flow
import styled from 'styled-components';
import { media, getColors } from '../../../../styles/themes/utils';

const Box = styled.div`
  color: ${props => getColors(props.theme.colors, props.color).fg};
  background-color: ${props => getColors(props.theme.colors, props.color).bgsolid};
  position: relative;
  overflow: hidden;
  padding: 1em;
  max-width: 100%;
  max-height: 100%;
  ${props => media(props.theme.breakpoints.tablet)`
    background-color: ${props => getColors(props.theme.colors, props.color).bgtrans};
    position: absolute;
    width: ${props => props.width}%;
    height: ${props => props.height};
    left: ${props => (100 - props.width) / 2}%;
    bottom: ${props => props.bottom};
  `};
`;

Box.displayName = 'Box';

Box.defaultProps = {
  theme: {
    colors: {
      red: {
        fg: '#fafafa',
        bgsolid: 'rgba(221, 52, 40, 1)',
        bgtrans: 'rgba(221, 52, 40, 0.7)',
        huerotation: '320deg',
      },
      default: {
        fg: '#fafafa',
        bgsolid: 'rgba(239, 223, 15, 1)',
        bgtrans: 'rgba(239, 223, 15, 0.7)',
        huerotation: '5deg',
      },
    },
    breakpoints: {
      tablet: 768,
    },
  },
};

export default Box;
