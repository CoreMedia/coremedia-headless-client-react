// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import Wrapper from '../Wrapper';

describe('Wrapper Component', () => {
  it('should render correctly using default props', () => {
    const tree = renderer.create(<Wrapper>Content</Wrapper>).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly using specific props', () => {
    const tree = renderer
      .create(
        <Wrapper width={200} height={100}>
          Content
        </Wrapper>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
