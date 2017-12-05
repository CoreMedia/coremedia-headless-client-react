// @flow
import styled from 'styled-components';

import { getColors } from '../../../../styles/themes/utils';

const Img = styled.img`
  display: block;
  border: 0;
  margin: 0;
  padding: 0;
  width: 100%;
  filter: sepia(100%) saturate(250%) brightness(70%)
    hue-rotate(${props => getColors(props.theme.colors, props.color).huerotation});
`;

Img.displayName = 'Img';

Img.defaultProps = {
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
  },
};

export default Img;
