// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import ReloadBox from '../ReloadBox';

describe('ReloadBox Component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<ReloadBox>Content</ReloadBox>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
