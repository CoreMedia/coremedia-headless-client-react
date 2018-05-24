// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import ProductOptions from '../ProductOptions';

describe('ProductOptions Component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<ProductOptions>Content</ProductOptions>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
