// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import ProductBox from '../ProductBox';

describe('ProductBox Component', () => {
  describe('with default theme', () => {
    it('should render correctly (entered=false)', () => {
      const tree = renderer
        .create(
          <ProductBox index={1} entered={false}>
            Content
          </ProductBox>
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('should render correctly (entered=true)', () => {
      const tree = renderer
        .create(
          <ProductBox index={1} entered={true}>
            Content
          </ProductBox>
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
  describe('with hkm theme', () => {
    it('should render correctly (entered=false)', () => {
      const tree = renderer
        .create(
          <ProductBox
            index={1}
            entered={false}
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
          </ProductBox>
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('should render correctly (entered=true)', () => {
      const tree = renderer
        .create(
          <ProductBox
            index={1}
            entered={true}
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
          </ProductBox>
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
