// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import ErrorBox from '../ErrorBox';

describe('ErrorBox Component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<ErrorBox>Content</ErrorBox>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
