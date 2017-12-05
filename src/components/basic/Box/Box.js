// @flow
import styled from 'styled-components';

const Box = styled.div`
  margin: 0;
  padding: 0;
  font-family: ${props => props.theme.typography.fontFamily.text};
  line-height: 1.4;
  box-sizing: border-box;
`;

Box.displayName = 'Box';

Box.defaultProps = {
  theme: {
    typography: {
      fontFamily: {
        text: 'Helvetica',
      },
    },
  },
};

export default Box;
