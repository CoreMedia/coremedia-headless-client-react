// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { VideoBox } from '..';

describe('VideoBox Component', () => {
  it('should render correctly with show = true', () => {
    const tree = renderer.create(<VideoBox show>Content</VideoBox>).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly with show = false', () => {
    const tree = renderer.create(<VideoBox>Content</VideoBox>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
