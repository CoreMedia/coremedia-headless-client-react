// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import ProductPrice from '../ProductPrice';

describe('ProductPrice Component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<ProductPrice>Content</ProductPrice>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
