// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import RepeatIcon from '../RepeatIcon';

jest.mock('uuid/v4');

describe('RepeatIcon Component', () => {
  it('should render correctly with default props', () => {
    const tree = renderer.create(<RepeatIcon />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly with color #000', () => {
    const tree = renderer.create(<RepeatIcon color="#000" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly with size 40', () => {
    const tree = renderer.create(<RepeatIcon size={40} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
