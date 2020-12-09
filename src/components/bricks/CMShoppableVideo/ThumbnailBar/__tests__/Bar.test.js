// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import Bar from '../Bar';

describe('Bar Component', () => {
  describe('with default theme', () => {
    it('should render correctly with zero width', () => {
      const tree = renderer.create(<Bar posX={0} width={0} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('should render correctly with 10px width', () => {
      const tree = renderer.create(<Bar posX={0} width={10} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('should render correctly with 10px width and 5px posX', () => {
      const tree = renderer.create(<Bar posX={5} width={10} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
  describe('with hkm theme', () => {
    it('should render correctly with zero width', () => {
      const tree = renderer.create(<Bar theme={{ name: 'hkm' }} posX={0} width={0} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('should render correctly with 10px width', () => {
      const tree = renderer.create(<Bar theme={{ name: 'hkm' }} posX={0} width={10} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('should render correctly with 10px width and 5px posX', () => {
      const tree = renderer.create(<Bar theme={{ name: 'hkm' }} posX={5} width={10} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
