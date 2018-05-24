// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import ContentBox from '../ContentBox';

describe('ContentBox Component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<ContentBox>Content</ContentBox>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
