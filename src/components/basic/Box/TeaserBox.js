// @flow
import styled from 'styled-components';

const TeaserBox = styled.div`
  position: relative;
  border: 0;
  box-sizing: border-box;
  > * {
    box-sizing: border-box;
  }
`;
TeaserBox.displayName = 'TeaserBox';

export default TeaserBox;
