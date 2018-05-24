// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import ProductInfo from '../ProductInfo';

describe('ProductInfo Component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<ProductInfo>Content</ProductInfo>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
