// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import PosterBox from '../PosterBox';

describe('PosterBox Component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<PosterBox>Content</PosterBox>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
