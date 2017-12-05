// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { PictureWrapper } from '../Wrapper';

describe('PictureWrapper Component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<PictureWrapper>Content</PictureWrapper>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
