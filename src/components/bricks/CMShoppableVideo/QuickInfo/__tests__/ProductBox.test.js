// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import ProductBox from '../ProductBox';

describe('ProductBox Component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<ProductBox>Content</ProductBox>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
