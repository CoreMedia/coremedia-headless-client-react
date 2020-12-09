// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import CloseIcon from '../CloseIcon';

jest.mock('uuid/v4');

describe('CloseIcon Component', () => {
  it('should render correctly with default props', () => {
    const tree = renderer.create(<CloseIcon />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly with color #000', () => {
    const tree = renderer.create(<CloseIcon color="#000" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly with size 40', () => {
    const tree = renderer.create(<CloseIcon size={40} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
