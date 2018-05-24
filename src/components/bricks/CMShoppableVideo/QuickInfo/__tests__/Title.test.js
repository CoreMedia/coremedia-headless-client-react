// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import Title from '../Title';

describe('Title Component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<Title>Content</Title>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
