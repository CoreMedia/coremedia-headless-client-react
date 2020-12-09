// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import Abstract from '../Abstract';

describe('Abstract Component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<Abstract>Content</Abstract>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
