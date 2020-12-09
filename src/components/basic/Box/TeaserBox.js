// @flow
import styled from 'styled-components';

const TeaserBox = styled.div`
  position: relative;
  border: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  > * {
    box-sizing: border-box;
  }
`;
TeaserBox.displayName = 'TeaserBox';

export default TeaserBox;
