// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import H3 from '../H3';

describe('H3 Component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<H3>Content</H3>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
