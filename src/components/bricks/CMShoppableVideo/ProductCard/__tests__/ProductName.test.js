// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import ProductName from '../ProductName';

describe('ProductName Component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<ProductName>Content</ProductName>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
