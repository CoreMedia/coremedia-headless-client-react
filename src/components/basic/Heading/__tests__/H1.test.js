// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { H1 } from '..';

describe('H1 Component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<H1>Content</H1>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
