// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import Box from '../Box';

describe('Box Component', () => {
  it('should render correctly', () => {
    const tree = renderer
      .create(
        <Box width={70} height="100%" bottom="10px">
          Content
        </Box>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
