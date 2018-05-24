// @flow
import { P } from '../../../basic/Paragraph';
import { media, getColors } from '../../../../styles/themes/utils';

const Abstract = P.extend`
  font-weight: 300;
  padding: 2em;
  color: ${props => getColors(props.theme.colors, props.color).fg};
  background-color: ${props => getColors(props.theme.colors, props.color).bgsolid};
  font-size: 1.2em;
  ${props => media(props.theme.breakpoints.tablet)`
    font-size: 1.3em;
  `};
  ${props => media(props.theme.breakpoints.desktop)`
    font-size: 1.4em;
  `};
  ${props => media(props.theme.breakpoints.large)`
    font-size: 1.6em;
  `};
`;

Abstract.displayName = 'Abstract';

Abstract.defaultProps = {
  theme: {
    name: 'default',
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
