// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import Box from '../Box';

describe('Box Component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<Box>Content</Box>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
