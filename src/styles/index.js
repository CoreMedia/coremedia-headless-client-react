import styled from 'styled-components';

const Box = styled.div`
  margin: 0;
  padding: 0;
  font-family: 'Simplon Norm Light', 'Lucida Sans', 'Lucida Sans Unicode', 'Lucida Grande', Arial, Helvetica, sans-serif;
  line-height: 1.4;
  box-sizing: border-box;
`;
Box.displayName = 'Box';

const TeaserBox = styled.div`
  position: relative;
  border: 0;
  box-sizing: border-box;
  > * {
    box-sizing: border-box;
  }
`;
TeaserBox.displayName = 'TeaserBox';

const H = Box.extend`
  font-family: 'Core Light', 'Simplon Norm Regular', 'Lucida Sans', 'Lucida Sans Unicode', 'Lucida Grande', Arial, Helvetica, sans-serif;
  font-weight: 400;
  line-height: 1.2;
  margin: 0;
  text-transform: uppercase;
`;
H.displayName = 'H';

const H1 = H.extend`
  font-size: 1.4em;
  @media only screen and (min-width: 48em) {
    font-size: 1.7em;
  }
  @media only screen and (min-width: 62em) {
    font-size: 2em;
  }
  @media only screen and (min-width: 75em) {
    font-size: 2.4em;
  }
`;
H1.displayName = 'H1';

const H2 = H.extend`
  font-size: 1.3em;
  @media only screen and (min-width: 48em) {
    font-size: 1.5em;
  }
  @media only screen and (min-width: 62em) {
    font-size: 1.7em;
  }
  @media only screen and (min-width: 75em) {
    font-size: 2em;
  }
`;
H2.displayName = 'H2';

const H3 = H.extend`
  font-size: 1.2em;
  @media only screen and (min-width: 48em) {
    font-size: 1.3em;
  }
  @media only screen and (min-width: 62em) {
    font-size: 1.4em;
  }
  @media only screen and (min-width: 75em) {
    font-size: 1.6em;
  }
`;
H3.displayName = 'H3';

const P = styled.p`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Simplon Norm Light', 'Lucida Sans', 'Lucida Sans Unicode', 'Lucida Grande', Arial, Helvetica, sans-serif;
  line-height: 1.4;
  font-size: 1em;
  font-weight: 400;
  @media only screen and (min-width: 48em) {
    font-size: 1em;
  }
  @media only screen and (min-width: 62em) {
    font-size: 1.1em;
  }
  @media only screen and (min-width: 75em) {
    font-size: 1.2em;
  }
`;
P.displayName = 'P';

export {Box, TeaserBox, H, H1, H2, H3, P};
