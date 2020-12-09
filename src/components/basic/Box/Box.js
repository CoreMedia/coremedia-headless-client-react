// @flow
import styled from 'styled-components';
import theme from 'styled-theming';

const fontFamily = theme('name', {
  default:
    '"Simplon Norm Light", "Lucida Sans", "Lucida Sans Unicode", "Lucida Grande", Arial, Helvetica, sans-serif',
  hkm: 'Helvetica, Arial, sans-serif',
});

const Box = styled.div`
  margin: 0;
  padding: 0;
  font-family: ${fontFamily};
  line-height: 1.4;
  box-sizing: border-box;
  white-space: normal;
`;

Box.displayName = 'Box';

Box.defaultProps = {
  theme: {
    name: 'default',
  },
};

export default Box;
