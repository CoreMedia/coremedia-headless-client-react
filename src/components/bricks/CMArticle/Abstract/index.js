// @flow
import { H3 } from '../../../basic/Heading';
import { getColors } from '../../../../styles/themes/utils';

const Abstract = H3.extend`
  font-family: ${props => props.theme.typography.fontFamily.text};
  font-weight: ${props => props.theme.typography.fontWeight.light};
  line-height: 1.4;
  text-transform: none;
  padding: 2em;
  color: ${props => getColors(props.theme.colors, props.color).fg};
  background-color: ${props => getColors(props.theme.colors, props.color).bgsolid};
`;

Abstract.displayName = 'Abstract';

Abstract.defaultProps = {
  theme: {
    typography: {
      fontFamily: {
        heading: 'Arial',
        text: 'Helvetica',
      },
      fontWeight: {
        light: 300,
        normal: 400,
      },
    },
    breakpoints: {
      tablet: 768,
      desktop: 992,
      large: 1280,
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

export default Abstract;
