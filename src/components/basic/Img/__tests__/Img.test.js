// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import Img from '..';

describe('Img Component', () => {
  it('should render correctly with default props', () => {
    const tree = renderer.create(<Img src="img.jpg" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly with width 100%', () => {
    const tree = renderer.create(<Img src="img.jpg" stretch />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
