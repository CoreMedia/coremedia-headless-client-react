// @flow
import { TeaserBox } from '../../../components/basic/Box';
import { getColors } from '../../../styles/themes/utils';

const ErrorBox = TeaserBox.extend`
  border: 2px solid ${props => getColors(props.theme.colors, 'red').bgsolid};
`;

ErrorBox.displayName = 'ErrorBox';

ErrorBox.defaultProps = {
  theme: {
    colors: {
      red: {
        bgsolid: 'rgba(221, 52, 40, 1)',
      },
    },
  },
};

export default ErrorBox;
