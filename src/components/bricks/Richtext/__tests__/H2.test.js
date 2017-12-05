// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { H2 } from '../Heading';

describe('H2 Component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<H2>Content</H2>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
