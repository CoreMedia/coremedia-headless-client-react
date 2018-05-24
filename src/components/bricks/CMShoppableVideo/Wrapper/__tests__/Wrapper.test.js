// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import Wrapper from '..';

describe('Wrapper Component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<Wrapper>Content</Wrapper>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
