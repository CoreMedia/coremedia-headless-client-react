// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { H2 } from '..';

describe('H2 Component', () => {
  it('should render correctly with default theme', () => {
    const tree = renderer.create(<H2>Content</H2>).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly with hkm theme', () => {
    const hkmTheme = {
      name: 'hkm',
      breakpoints: {
        tablet: 768,
        desktop: 992,
        large: 1280,
      },
    };
    const tree = renderer.create(<H2 theme={hkmTheme}>Content</H2>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
