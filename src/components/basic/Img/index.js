// @flow
import styled from 'styled-components';

const Img = styled.img`
  display: block;
  border: 0;
  margin: 0;
  padding: 0;
  width: ${props => (props.stretch ? '100%' : 'auto')};
`;

Img.displayName = 'BasicImg';

export default Img;
