// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import IconButton from '../IconButton';

describe('IconButton Component', () => {
  it('should render correctly with default props', () => {
    const tree = renderer.create(<IconButton>Content</IconButton>).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly with given color', () => {
    const tree = renderer.create(<IconButton color="#fff">Content</IconButton>).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly with given backgroundColor', () => {
    const tree = renderer.create(<IconButton backgroundColor="#fff">Content</IconButton>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
