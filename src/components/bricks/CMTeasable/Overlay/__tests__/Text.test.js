// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import Text from '../Text';

describe('Text Component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<Text>Content</Text>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
