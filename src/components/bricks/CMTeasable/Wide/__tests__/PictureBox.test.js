// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import PictureBox from '../PictureBox';

describe('PictureBox Component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<PictureBox>Content</PictureBox>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
