// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import TextBox from '../TextBox';

describe('TextBox Component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<TextBox>Content</TextBox>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
