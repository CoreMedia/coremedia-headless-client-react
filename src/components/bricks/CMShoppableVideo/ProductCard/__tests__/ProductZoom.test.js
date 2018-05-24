// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import ProductZoom from '../ProductZoom';

describe('ProductZoom Component', () => {
  describe('with default theme', () => {
    it('should render correctly', () => {
      const tree = renderer.create(<ProductZoom>Content</ProductZoom>).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
  describe('with hkm theme', () => {
    it('should render correctly', () => {
      const tree = renderer
        .create(
          <ProductZoom
            theme={{
              name: 'hkm',
              breakpoints: {
                tablet: 768,
                desktop: 992,
                large: 1280,
              },
            }}
          >
            Content
          </ProductZoom>
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
