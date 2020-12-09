// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import PlayIcon from '../PlayButton/PlayIcon';

describe('PlayIcon Component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<PlayIcon />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
