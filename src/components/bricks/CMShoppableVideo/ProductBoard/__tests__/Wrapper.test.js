// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import Wrapper from '../Wrapper';

describe('Wrapper Component', () => {
  describe('with default theme', () => {
    it('should render correctly', () => {
      const tree = renderer.create(<Wrapper>Content</Wrapper>).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
  describe('with hkm theme', () => {
    it('should render correctly', () => {
      const tree = renderer
        .create(
          <Wrapper
            theme={{
              breakpoints: {
                tablet: 768,
              },
              name: 'hkm',
            }}
          >
            Content
          </Wrapper>
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
