// @flow
import styled from 'styled-components';
import { media, getColors } from '../../../../styles/themes/utils';

const FixedBox = styled.div`
  color: ${props => getColors(props.theme.colors, props.color).fg};
  background-color: ${props => getColors(props.theme.colors, props.color).bgtrans};
  overflow: hidden;
  padding: 1em;
  max-width: 100%;
  max-height: 100%;
  position: absolute;
  width: ${props => props.width}%;
  left: ${props => (100 - props.width) / 2}%;
  bottom: ${props => props.bottom};
  ${props => media(props.theme.breakpoints.tablet)`height: ${props => props.height};`};
`;

FixedBox.displayName = 'FixedBox';

FixedBox.defaultProps = {
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

export default FixedBox;
