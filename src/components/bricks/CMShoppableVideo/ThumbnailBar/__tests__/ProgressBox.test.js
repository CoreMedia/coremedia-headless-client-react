// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import ProgressBox from '../ProgressBox';

describe('ProgressBox Component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<ProgressBox>Content</ProgressBox>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
