// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import TextBoxWrapper from '../TextBoxWrapper';

describe('TextBoxWrapper Component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<TextBoxWrapper>Content</TextBoxWrapper>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
